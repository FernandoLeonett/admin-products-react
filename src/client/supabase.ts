


import { createClient } from "@supabase/supabase-js";
export const supabase = createClient(
  "https://ssfvmwrybbqyhxrnqfkf.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzZnZtd3J5YmJxeWh4cm5xZmtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjE0NjE3NzcsImV4cCI6MTk3NzAzNzc3N30.LWI9Sim4etln2jUuv6cPW4m0G5a4AGYeE4YQrDRhhs8"
);

// Make a request
// const { data: todos, error } = await supabase.from("products").select("*");
