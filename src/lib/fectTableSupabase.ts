// lib/fectTableSupabase.ts
import supabase from "./supabase";

// Define a type for the table object returned by Supabase
export interface Table {
  name: string;
}

// Fetch the list of tables from Supabase using RPC
export async function fetchTables(): Promise<Table[]> {
  const { data, error } = await supabase.rpc("get_tables"); // Call the RPC function

  // Handle any errors
  if (error) {
    console.error("Error fetching tables:", error.message);
    console.error("Error details:", error);
    return [];
  }

  // If no data is returned, log it
  if (!data) {
    console.error("No data returned from the RPC call.");
    return [];
  }

  // Map the data to the Table[] format
  return data.map((item: { table_name: string }) => ({
    name: item.table_name,
  })) as Table[];
}
