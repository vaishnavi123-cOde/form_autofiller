EXTRACTION_PROMPT = """
Identify the document type, then extract the relevant fields into a flat JSON object.

Every value must be a plain string (never an object or array).
Use null if a field is not found.
Pick field names that make sense for this document (e.g. for a resume use name, email, skills, experience; for an invoice use invoice_number, date, total, vendor; etc).

Example:
{"name": "John Doe", "invoice_total": "$1,200"}

Rules:
- No markdown, no code blocks, no extra text.
- Only meaningful fields — skip anything not present in the document.
"""