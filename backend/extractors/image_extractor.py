import easyocr

reader = easyocr.Reader(
    ["en"]
)


def extract_image_text(
    path: str
):

    result = reader.readtext(
        path
    )

    text = "\n".join(
        item[1]
        for item in result
    )

    return text