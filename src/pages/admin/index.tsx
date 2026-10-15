import * as React from 'react';

import {
  Alert,
  AppBar,
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material';
import AdminAuthGuard from '@/components/AdminAuthGuard';
import { alpha, useTheme } from '@mui/material/styles';

import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import DatabaseRoundedIcon from '@mui/icons-material/StorageRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import TableChartRoundedIcon from '@mui/icons-material/TableChartRounded';

import supabase from '@/lib/supabase';

type JsonRecord = Record<string, unknown>;

type AdminTable = {
  name: string;
  label: string;
  description: string;
  primaryKey: string;
};

/**
 * Configure the tables available in the admin dashboard here.
 *
 * These names are based on our previous Cryptech Services work.
 * Confirm them against your actual Supabase schema.
 *
 * Change primaryKey if a table uses a different primary-key column.
 */
const ADMIN_TABLES: AdminTable[] = [
  {
    name: 'sc_team_members',
    label: 'Team Members',
    description: 'Manage admins, team members, and moderators.',
    primaryKey: 'id'
  },
  {
    name: 'sc_services',
    label: 'Services',
    description: 'Manage the services displayed on your website.',
    primaryKey: 'id'
  },
  {
    name: 'sc_security_tiers',
    label: 'Security Tiers',
    description: 'Manage Essential, Advanced, and Enterprise tiers.',
    primaryKey: 'id'
  },
  {
    name: 'sc_security_capabilities',
    label: 'Security Capabilities',
    description: 'Manage security features and capabilities.',
    primaryKey: 'id'
  },
  {
    name: 'sc_security_notes',
    label: 'Security Notes',
    description: 'Manage security-related notes.',
    primaryKey: 'id'
  },
  {
    name: 'ztable_otherprojects',
    label: 'Other Projects',
    description: 'Manage additional projects.',
    primaryKey: 'id'
  },
  {
    name: 'sc_game_servers',
    label: 'Games',
    description: 'Manage Minecraft, Project Zomboid, and Luanti game servers.',
    primaryKey: 'id'
  },
  {
    name: 'sc_faqs',
    label: 'FAQs',
    description: 'Manage frequently asked questions and answers.',
    primaryKey: 'id'
  },
  {
    name: 'sc_projects',
    label: 'Projects',
    description: 'Manage featured projects displayed on your website.',
    primaryKey: 'id'
  },
  {
    name: 'services',
    label: 'Public Services',
    description: 'Manage records in the public services table.',
    primaryKey: 'id'
  }
];

type EditorState = {
  mode: 'create' | 'edit';
  record: JsonRecord;
};

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

function formatValue(value: unknown): string {
  if (value === null || value === undefined) {
    return '—';
  }

  if (typeof value === 'object') {
    return JSON.stringify(value);
  }

  return String(value);
}

function getDisplayColumns(rows: JsonRecord[]): string[] {
  const columns = new Set<string>();

  rows.forEach((row) => {
    Object.keys(row).forEach((key) => columns.add(key));
  });

  return Array.from(columns);
}

export default function AdminPage() {
  const theme = useTheme();

  const isDark = theme.palette.mode === 'dark';

  const primary = theme.colorScale?.[9] ?? theme.palette.primary.main;

  const secondary = theme.secondaryScale?.[9] ?? theme.palette.secondary.main;

  const headingColor = theme.grayScale?.[12] ?? theme.palette.text.primary;

  const mutedColor = theme.grayScale?.[10] ?? theme.palette.text.secondary;

  const [activeTableName, setActiveTableName] = React.useState(
    ADMIN_TABLES[0].name
  );

  const [rows, setRows] = React.useState<JsonRecord[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState('');
  const [notice, setNotice] = React.useState('');

  const [search, setSearch] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);

  const [editor, setEditor] = React.useState<EditorState | null>(null);
  const [editorText, setEditorText] = React.useState('{}');
  const [editorError, setEditorError] = React.useState('');

  const [deleteTarget, setDeleteTarget] = React.useState<JsonRecord | null>(
    null
  );

  const activeTable =
    ADMIN_TABLES.find((table) => table.name === activeTableName) ??
    ADMIN_TABLES[0];

  const loadRows = React.useCallback(async () => {
    setLoading(true);
    setError('');
    setNotice('');

    try {
      const { data, error: queryError } = await supabase
        .from(activeTable.name)
        .select('*')
        .limit(1000);

      if (queryError) {
        throw queryError;
      }

      setRows((data ?? []) as JsonRecord[]);
      setPage(0);
    } catch (caught) {
      setRows([]);

      setError(
        caught instanceof Error
          ? caught.message
          : 'Unable to load records from Supabase.'
      );
    } finally {
      setLoading(false);
    }
  }, [activeTable.name]);

  React.useEffect(() => {
    void loadRows();
  }, [loadRows]);

  const filteredRows = React.useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return rows;
    }

    return rows.filter((row) =>
      Object.values(row).some((value) =>
        formatValue(value).toLowerCase().includes(query)
      )
    );
  }, [rows, search]);

  const columns = React.useMemo(
    () => getDisplayColumns(filteredRows),
    [filteredRows]
  );

  const paginatedRows = filteredRows.slice(
    page * pageSize,
    page * pageSize + pageSize
  );

  const openCreateDialog = () => {
    const initialRecord: JsonRecord = {};

    setEditor({
      mode: 'create',
      record: initialRecord
    });

    setEditorText(JSON.stringify(initialRecord, null, 2));
    setEditorError('');
    setError('');
    setNotice('');
  };

  const openEditDialog = (record: JsonRecord) => {
    setEditor({
      mode: 'edit',
      record
    });

    setEditorText(JSON.stringify(record, null, 2));
    setEditorError('');
    setError('');
    setNotice('');
  };

  const closeEditor = () => {
    if (saving) {
      return;
    }

    setEditor(null);
    setEditorError('');
  };

  const saveRecord = async () => {
    setEditorError('');
    setError('');
    setNotice('');

    let parsedRecord: JsonRecord;

    try {
      const parsed: unknown = JSON.parse(editorText);

      if (
        parsed === null ||
        Array.isArray(parsed) ||
        typeof parsed !== 'object'
      ) {
        throw new Error('The record must be a JSON object.');
      }

      parsedRecord = parsed as JsonRecord;
    } catch (caught) {
      setEditorError(
        caught instanceof Error ? caught.message : 'Enter valid JSON.'
      );

      return;
    }

    if (Object.keys(parsedRecord).length === 0) {
      setEditorError(
        'Enter at least one field. Required fields depend on your table schema.'
      );

      return;
    }

    setSaving(true);

    try {
      if (editor?.mode === 'create') {
        const { error: insertError } = await supabase
          .from(activeTable.name)
          .insert(parsedRecord);

        if (insertError) {
          throw insertError;
        }

        setNotice('Record created successfully.');
      } else if (editor?.mode === 'edit') {
        const primaryKeyValue = editor.record[activeTable.primaryKey];

        if (primaryKeyValue === null || primaryKeyValue === undefined) {
          throw new Error(
            `Cannot update this record: primary key "${activeTable.primaryKey}" was not found.`
          );
        }

        // Never allow an edit to change the selected record's primary key.
        const updateRecord = { ...parsedRecord };
        delete updateRecord[activeTable.primaryKey];

        const { error: updateError } = await supabase
          .from(activeTable.name)
          .update(updateRecord)
          .eq(activeTable.primaryKey, primaryKeyValue);

        if (updateError) {
          throw updateError;
        }

        setNotice('Record updated successfully.');
      }

      setEditor(null);
      await loadRows();
    } catch (caught) {
      setEditorError(
        caught instanceof Error ? caught.message : 'Unable to save the record.'
      );
    } finally {
      setSaving(false);
    }
  };

  const deleteRecord = async () => {
    if (!deleteTarget) {
      return;
    }

    const primaryKeyValue = deleteTarget[activeTable.primaryKey];

    if (primaryKeyValue === null || primaryKeyValue === undefined) {
      setError(
        `Cannot delete this record: primary key "${activeTable.primaryKey}" was not found.`
      );

      setDeleteTarget(null);
      return;
    }

    setSaving(true);
    setError('');
    setNotice('');

    try {
      const { error: deleteError } = await supabase
        .from(activeTable.name)
        .delete()
        .eq(activeTable.primaryKey, primaryKeyValue);

      if (deleteError) {
        throw deleteError;
      }

      setDeleteTarget(null);
      setNotice('Record deleted successfully.');

      await loadRows();
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : 'Unable to delete the record.'
      );
    } finally {
      setSaving(false);
    }
  };

  const sidebarBackground = isDark
    ? alpha(theme.palette.background.paper, 0.8)
    : theme.palette.background.paper;

  return (
    <AdminAuthGuard>
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'background.default',
          color: headingColor
        }}
      >
        <AppBar
          position="sticky"
          elevation={0}
          color="transparent"
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            bgcolor: alpha(theme.palette.background.paper, 0.9),
            backdropFilter: 'blur(16px)'
          }}
        >
          <Toolbar
            sx={{
              minHeight: '72px !important',
              px: { xs: 2, md: 4 },
              gap: 1.5
            }}
          >
            <Avatar
              variant="rounded"
              sx={{
                background: `linear-gradient(135deg, ${primary}, ${secondary})`,
                color: '#fff',
                width: 42,
                height: 42
              }}
            >
              <CodeRoundedIcon />
            </Avatar>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{ fontWeight: 800, letterSpacing: '-0.04em' }}>
                CRYPTECH
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: 'block', mt: -0.3 }}
              >
                Administration Console
              </Typography>
            </Box>

            <Chip
              icon={<DatabaseRoundedIcon />}
              label="Supabase"
              variant="outlined"
              size="small"
            />

            <Tooltip title="Refresh records">
              <span>
                <IconButton
                  onClick={() => void loadRows()}
                  disabled={loading || saving}
                  aria-label="Refresh records"
                >
                  <RefreshRoundedIcon />
                </IconButton>
              </span>
            </Tooltip>
          </Toolbar>
        </AppBar>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: '250px minmax(0, 1fr)'
            },
            minHeight: 'calc(100vh - 72px)'
          }}
        >
          {/* Sidebar */}
          <Box
            component="aside"
            sx={{
              p: 2,
              bgcolor: sidebarBackground,
              borderRight: { xs: 0, md: 1 },
              borderBottom: { xs: 1, md: 0 },
              borderColor: 'divider'
            }}
          >
            <Stack spacing={1}>
              <Typography
                variant="overline"
                color="text.secondary"
                sx={{ px: 1.5, fontWeight: 800 }}
              >
                Workspace
              </Typography>

              <Button
                fullWidth
                startIcon={<DashboardRoundedIcon />}
                sx={{
                  justifyContent: 'flex-start',
                  px: 1.5,
                  py: 1.2,
                  color: 'text.primary'
                }}
                onClick={() => {
                  setSearch('');
                  setNotice('');
                  setError('');
                  void loadRows();
                }}
              >
                Overview
              </Button>

              <Divider sx={{ my: 1 }} />

              <Typography
                variant="overline"
                color="text.secondary"
                sx={{ px: 1.5, fontWeight: 800 }}
              >
                Database tables
              </Typography>

              {ADMIN_TABLES.map((table) => {
                const selected = table.name === activeTableName;

                return (
                  <Button
                    key={table.name}
                    fullWidth
                    startIcon={<TableChartRoundedIcon />}
                    onClick={() => {
                      setActiveTableName(table.name);
                      setSearch('');
                      setPage(0);
                      setError('');
                      setNotice('');
                      setEditor(null);
                      setDeleteTarget(null);
                    }}
                    sx={{
                      justifyContent: 'flex-start',
                      textAlign: 'left',
                      px: 1.5,
                      py: 1.2,
                      color: selected ? primary : 'text.secondary',
                      bgcolor: selected ? alpha(primary, 0.1) : 'transparent',
                      '&:hover': {
                        bgcolor: alpha(primary, 0.08)
                      }
                    }}
                  >
                    <Box
                      sx={{
                        minWidth: 0,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {table.label}
                    </Box>
                  </Button>
                );
              })}
            </Stack>
          </Box>

          {/* Main content */}
          <Box
            component="main"
            sx={{
              minWidth: 0,
              p: { xs: 2, md: 4 }
            }}
          >
            <Container maxWidth={false} disableGutters>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                sx={{
                  alignItems: { xs: 'stretch', sm: 'center' },
                  justifyContent: 'space-between',
                  spacing: 2,
                  mb: 4
                }}
              >
                <Box>
                  <Typography
                    variant="overline"
                    sx={{ color: 'text.secondary', fontWeight: 800 }}
                  >
                    DATABASE / {activeTable.name}
                  </Typography>

                  <Typography
                    variant="h4"
                    sx={{
                      mt: 0.5,
                      fontWeight: 850,
                      letterSpacing: '-0.045em'
                    }}
                  >
                    {activeTable.label}
                  </Typography>

                  <Typography color="text.secondary" sx={{ mt: 1 }}>
                    {activeTable.description}
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  startIcon={<AddRoundedIcon />}
                  onClick={openCreateDialog}
                  disabled={loading || saving}
                  sx={{
                    alignSelf: { xs: 'flex-start', sm: 'center' },
                    background: `linear-gradient(135deg, ${primary}, ${secondary})`,
                    boxShadow: 'none',
                    '&:hover': {
                      boxShadow: `0 8px 24px ${alpha(primary, 0.2)}`
                    }
                  }}
                >
                  Add record
                </Button>
              </Stack>

              {error && (
                <Alert
                  severity="error"
                  onClose={() => setError('')}
                  sx={{ mb: 2 }}
                >
                  {error}
                </Alert>
              )}

              {notice && (
                <Alert
                  severity="success"
                  onClose={() => setNotice('')}
                  sx={{ mb: 2 }}
                >
                  {notice}
                </Alert>
              )}

              {/* Statistics */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(3, minmax(0, 1fr))'
                  },
                  gap: 2,
                  mb: 3
                }}
              >
                {[
                  {
                    label: 'Loaded records',
                    value: rows.length
                  },
                  {
                    label: 'Matching records',
                    value: filteredRows.length
                  },
                  {
                    label: 'Available tables',
                    value: ADMIN_TABLES.length
                  }
                ].map((item) => (
                  <Paper
                    key={item.label}
                    variant="outlined"
                    sx={{
                      p: 2.5,
                      borderRadius: 3,
                      bgcolor: 'background.paper'
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      {item.label}
                    </Typography>

                    <Typography
                      variant="h4"
                      sx={{
                        mt: 1,
                        fontWeight: 800,
                        letterSpacing: '-0.04em'
                      }}
                    >
                      {item.value}
                    </Typography>
                  </Paper>
                ))}
              </Box>

              {/* Table controls */}
              <Paper
                variant="outlined"
                sx={{
                  overflow: 'hidden',
                  borderRadius: 3
                }}
              >
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  sx={{
                    alignItems: { xs: 'stretch', sm: 'center' },
                    spacing: 2,
                    p: 2
                  }}
                >
                  <TextField
                    select
                    size="small"
                    label="Table"
                    value={activeTableName}
                    onChange={(event) => {
                      setActiveTableName(event.target.value);
                      setSearch('');
                      setPage(0);
                      setEditor(null);
                      setDeleteTarget(null);
                    }}
                    sx={{ minWidth: { sm: 220 } }}
                  >
                    {ADMIN_TABLES.map((table) => (
                      <MenuItem key={table.name} value={table.name}>
                        {table.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    size="small"
                    fullWidth
                    value={search}
                    onChange={(event) => {
                      setSearch(event.target.value);
                      setPage(0);
                    }}
                    placeholder="Search any field..."
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchRoundedIcon fontSize="small" />
                          </InputAdornment>
                        ),
                        endAdornment: search ? (
                          <InputAdornment position="end">
                            <IconButton
                              size="small"
                              aria-label="Clear search"
                              onClick={() => setSearch('')}
                            >
                              <CloseRoundedIcon fontSize="small" />
                            </IconButton>
                          </InputAdornment>
                        ) : undefined
                      }
                    }}
                  />

                  <Button
                    variant="outlined"
                    startIcon={<RefreshRoundedIcon />}
                    onClick={() => void loadRows()}
                    disabled={loading || saving}
                  >
                    Refresh
                  </Button>
                </Stack>

                <Divider />

                {loading ? (
                  <Stack
                    sx={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      spacing: 2,
                      py: 10
                    }}
                  >
                    <CircularProgress size={30} />
                    <Typography variant="body2" color="text.secondary">
                      Loading records...
                    </Typography>
                  </Stack>
                ) : columns.length === 0 ? (
                  <Stack
                    sx={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      spacing: 2,
                      py: 10,
                      px: 3
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 56,
                        height: 56,
                        bgcolor: alpha(primary, 0.1),
                        color: primary
                      }}
                    >
                      <DatabaseRoundedIcon />
                    </Avatar>

                    <Typography sx={{ fontWeight: 750 }}>
                      {rows.length === 0
                        ? 'No records found'
                        : 'No matching records'}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary', textAlign: 'center' }}
                    >
                      {rows.length === 0
                        ? 'This table is empty, or Supabase permissions prevented the query.'
                        : 'Try a different search term.'}
                    </Typography>

                    {rows.length === 0 && (
                      <Button
                        variant="contained"
                        startIcon={<AddRoundedIcon />}
                        onClick={openCreateDialog}
                        sx={{
                          mt: 1,
                          background: `linear-gradient(135deg, ${primary}, ${secondary})`
                        }}
                      >
                        Create first record
                      </Button>
                    )}
                  </Stack>
                ) : (
                  <>
                    <TableContainer sx={{ maxHeight: '65vh' }}>
                      <Table
                        stickyHeader
                        size="small"
                        sx={{
                          minWidth: 750,
                          '& th': {
                            bgcolor: 'background.default',
                            color: mutedColor,
                            fontWeight: 800,
                            whiteSpace: 'nowrap'
                          },
                          '& td': {
                            borderColor: 'divider'
                          }
                        }}
                      >
                        <TableHead>
                          <TableRow>
                            {columns.map((column) => (
                              <TableCell key={column}>{column}</TableCell>
                            ))}

                            <TableCell align="right">Actions</TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {paginatedRows.map((record, index) => (
                            <TableRow
                              hover
                              key={`${String(
                                record[activeTable.primaryKey] ?? 'row'
                              )}-${index}`}
                            >
                              {columns.map((column) => (
                                <TableCell
                                  key={column}
                                  sx={{
                                    maxWidth: 300,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                  }}
                                >
                                  <Tooltip
                                    title={formatValue(record[column])}
                                    enterDelay={500}
                                  >
                                    <Box
                                      component="span"
                                      sx={{
                                        display: 'inline-block',
                                        maxWidth: '100%',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        verticalAlign: 'middle'
                                      }}
                                    >
                                      {formatValue(record[column])}
                                    </Box>
                                  </Tooltip>
                                </TableCell>
                              ))}

                              <TableCell align="right">
                                <Stack
                                  direction="row"
                                  spacing={0.5}
                                  sx={{ justifyContent: 'flex-end' }}
                                >
                                  <Tooltip title="Edit record">
                                    <IconButton
                                      size="small"
                                      aria-label="Edit record"
                                      onClick={() => openEditDialog(record)}
                                    >
                                      <EditRoundedIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>

                                  <Tooltip title="Delete record">
                                    <IconButton
                                      size="small"
                                      color="error"
                                      aria-label="Delete record"
                                      onClick={() => setDeleteTarget(record)}
                                    >
                                      <DeleteRoundedIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                </Stack>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>

                    <TablePagination
                      component="div"
                      count={filteredRows.length}
                      page={page}
                      onPageChange={(_, nextPage) => setPage(nextPage)}
                      rowsPerPage={pageSize}
                      onRowsPerPageChange={(event) => {
                        setPageSize(Number(event.target.value));
                        setPage(0);
                      }}
                      rowsPerPageOptions={PAGE_SIZE_OPTIONS}
                    />
                  </>
                )}
              </Paper>

              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: 'block', mt: 2 }}
              >
                Records are loaded in batches of up to 1,000. This dashboard
                currently searches the loaded records only.
              </Typography>
            </Container>
          </Box>
        </Box>

        {/* Create / edit record dialog */}
        <Dialog
          open={Boolean(editor)}
          onClose={closeEditor}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle sx={{ pr: 7 }}>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              {editor?.mode === 'create' ? 'Create record' : 'Edit record'}
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Table: {activeTable.name}
            </Typography>

            <IconButton
              aria-label="Close editor"
              onClick={closeEditor}
              disabled={saving}
              sx={{ position: 'absolute', right: 12, top: 12 }}
            >
              <CloseRoundedIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent dividers>
            <Alert severity="info" sx={{ mb: 2 }}>
              Edit the record as JSON. Use valid JSON syntax, keep field names
              exactly as they appear in your database, and remove generated
              fields you do not want to set when creating a record.
            </Alert>

            {editorError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {editorError}
              </Alert>
            )}

            <TextField
              fullWidth
              multiline
              minRows={14}
              maxRows={28}
              value={editorText}
              onChange={(event) => setEditorText(event.target.value)}
              spellCheck={false}
              placeholder={'{\n  "name": "Example"\n}'}
              slotProps={{
                htmlInput: {
                  style: {
                    fontFamily: 'monospace',
                    fontSize: 13,
                    lineHeight: 1.7
                  }
                }
              }}
            />

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: 'block', mt: 1 }}
            >
              Primary key: {activeTable.primaryKey}
            </Typography>
          </DialogContent>

          <DialogActions sx={{ p: 2 }}>
            <Button onClick={closeEditor} disabled={saving}>
              Cancel
            </Button>

            <Button
              variant="contained"
              onClick={() => void saveRecord()}
              disabled={saving}
              startIcon={
                saving ? (
                  <CircularProgress size={16} color="inherit" />
                ) : undefined
              }
              sx={{
                background: `linear-gradient(135deg, ${primary}, ${secondary})`
              }}
            >
              {saving
                ? 'Saving...'
                : editor?.mode === 'create'
                  ? 'Create record'
                  : 'Save changes'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete confirmation */}
        <Dialog
          open={Boolean(deleteTarget)}
          onClose={() => {
            if (!saving) {
              setDeleteTarget(null);
            }
          }}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle>Delete this record?</DialogTitle>

          <DialogContent>
            <Typography color="text.secondary">
              This permanently deletes the selected record from{' '}
              <strong>{activeTable.name}</strong>. This action cannot be undone.
            </Typography>

            {deleteTarget && (
              <Paper
                variant="outlined"
                sx={{
                  mt: 2,
                  p: 1.5,
                  borderRadius: 2,
                  overflowWrap: 'anywhere'
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  {activeTable.primaryKey}
                </Typography>

                <Typography sx={{ fontWeight: 700 }}>
                  {formatValue(deleteTarget[activeTable.primaryKey])}
                </Typography>
              </Paper>
            )}
          </DialogContent>

          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setDeleteTarget(null)} disabled={saving}>
              Cancel
            </Button>

            <Button
              color="error"
              variant="contained"
              onClick={() => void deleteRecord()}
              disabled={saving}
              startIcon={
                saving ? (
                  <CircularProgress size={16} color="inherit" />
                ) : (
                  <DeleteRoundedIcon />
                )
              }
            >
              Delete permanently
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </AdminAuthGuard>
  );
}
