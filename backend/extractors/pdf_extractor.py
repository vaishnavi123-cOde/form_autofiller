import pdfplumber


def extract_pdf_text(
    pdf_path: str
):

    text = ""

    with pdfplumber.open(
        pdf_path
    ) as pdf:

        for page in pdf.pages:

            page_text = (
                page.extract_text()
            )

            if page_text:
                text += (
                    page_text + "\n"
                )

            tables = page.extract_tables()

            for table in tables:

                for row in table:

                    row_text = " | ".join(
                        cell or ""
                        for cell in row
                    )

                    if row_text.strip():
                        text += (
                            row_text + "\n"
                        )

                text += "\n"

    return text