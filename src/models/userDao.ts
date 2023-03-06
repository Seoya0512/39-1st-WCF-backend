import { appDataSource } from "./dataSource";

export const createUser = async (
  username: string,
  password: string,
  name: string,
  mobile_number: string,
  email: string,
  address: string
) => {
  await appDataSource.query(
    `INSERT INTO users(
        username,
        password,
        name,
        mobile_number,
        email,
        address
    ) VALUES (?, ?, ?, ?, ?, ?);
    `,
    [username, password, name, mobile_number, email, address]
  );
};

export const getUserByUsername = async (username: string) => {
  const [user] = await appDataSource.query(
    `
		SELECT 
      id,
      username,
      password,
      name,
      mobile_number,
      email,
      address
		FROM users
		WHERE username=?`,
    [username]
  );

  return user;
};

export const getUserById = async (id: number) => {
  const result = await appDataSource.query(
    `
		SELECT 
			id,
      username,
			name,
			email,
			password
		FROM users
		WHERE id=?`,
    [id]
  );

  return result[0];
};
