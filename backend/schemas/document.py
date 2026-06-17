from pydantic import BaseModel


class ExtractedDocument(
    BaseModel
):

    name: str | None = None

    email: str | None = None

    phone: str | None = None

    address: str | None = None

    education: str | None = None

    skills: list[str] | None = None

    experience: str | None = None

    linkedin: str | None = None

    github: str | None = None