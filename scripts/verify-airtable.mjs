const baseId = process.env.AIRTABLE_BASE_ID || 'appVTOkf1uejZrWGZ';
const token = process.env.AIRTABLE_TOKEN || '';
const strict = /^(1|true|yes)$/i.test(process.env.AIRTABLE_VERIFY_STRICT || '');

function softFail(message, code) {
  console.error(message);
  if (strict) process.exit(code);
  console.warn('AIRTABLE_VERIFY_WARN: verification is non-blocking during build. Runtime functions still require a valid AIRTABLE_TOKEN.');
  process.exit(0);
}

if (!token) {
  softFail('AIRTABLE_VERIFY_FAIL: AIRTABLE_TOKEN missing in Netlify build environment', 41);
}

const url = `https://api.airtable.com/v0/${baseId}/tblrxIPFH5IZqYcJ5?pageSize=1&returnFieldsByFieldId=true`;

let response;
try {
  response = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
} catch (error) {
  softFail(`AIRTABLE_VERIFY_FAIL: network error ${error?.message || error}`, 44);
}

if (!response.ok) {
  const body = (await response.text()).slice(0, 500);
  softFail(`AIRTABLE_VERIFY_FAIL: HTTP ${response.status} ${body}`, 42);
}

const data = await response.json();
if (!Array.isArray(data.records) || data.records.length < 1) {
  softFail('AIRTABLE_VERIFY_FAIL: Immobili returned no records', 43);
}

console.log(`AIRTABLE_VERIFY_OK: base=${baseId} records_sampled=${data.records.length}`);
