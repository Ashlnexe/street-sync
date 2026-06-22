const fs = require('fs');
const token = fs.readFileSync('temp_token.txt', 'utf8').trim();
const cmd = `Invoke-WebRequest -Uri 'https://fljrsgvsoedzgsklnpxb.supabase.co/rest/v1/orders?select=*' -Headers @{'apikey'='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsanJzZ3Zzb2Vkemdza2xucHhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExODkwMTksImV4cCI6MjA5Njc2NTAxOX0.D-enj57d3sD0wbyRdJ3oNNuyP7gyCpkyEz7kss2f4WU'; 'Authorization'='Bearer ${token}'} -UseBasicParsing`;
fs.writeFileSync('test.ps1', cmd);
