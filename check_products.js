require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function main() {
  const { data, error } = await supabase.from('products').select('title, badges, tags');
  if (error) {
    console.error('Error fetching products:', error);
  } else {
    console.log('Products:', JSON.stringify(data, null, 2));
  }
}

main();
