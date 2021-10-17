const createContacts = `
  CREATE TABLE IF NOT EXISTS "contacts"(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50),
    phone_number VARCHAR(15),
    email VARCHAR(50) NOT NULL,
  )
`;

pool
  .query(createContacts)
  .then((data) => {
    console.log(data, "success create table contacts");
  })
  .catch((err) => {
    console.log(err, "error create table cotacts");
  });
