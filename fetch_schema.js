require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data, error } = await supabase
    .from("orders")
    .insert([
      {
        customer_email: "test@example.com",
        total_amount: 100,
        status: "pending",
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Insertion error:", error);
  } else {
    console.log("Inserted successfully:", data);
  }
}

main();
