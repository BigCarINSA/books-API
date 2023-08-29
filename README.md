This is a book API which is used to CRUD books in db

Route:
    /: homepage (show "hello world!")
    /api/books : books API
        GET    /           : get all books
        GET    /:id        : get book by id
        POST   /store      : add new book
        PUT    /:id/update : edit a book by id
        DELETE /:id        : delete by id