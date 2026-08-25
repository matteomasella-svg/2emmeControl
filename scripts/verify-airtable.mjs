const baseId = process.env.AIRTABLE_BASE_ID || 'appVTOkf1uejZrWGZ';
const token = process.env.AIRTABLE_TOKEN || '';

if (!token) {
  console.error('AIRTABLE_VERIFY_FAIL: AIRTABLE_TOKEN missing in Netlify build environment');
  process.exit(41);
}

const url = `https://api.airtable.com/v0/${baseId}/tblrxIPFH5IZqYcJ5?pageSize=1&returnFieldsByFieldId=true`;
const response = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });

if (!response.ok) {
  const body = (await response.text()).slice(0, 500);
  console.error(`AIRTABLE_VERIFY_FAIL: HTTP ${response.status} ${body}`);
  process.exit(42);
}

const data = await response.json();
if (!Array.isArray(data.records) || data.records.length < 1) {
  console.error('AIRTABLE_VERIFY_FAIL: Immobili returned no records');
  process.exit(43);
}

console.log(`AIRTABLE_VERIFY_OK: base=${baseId} records_sampled=${data.records.length}`);
