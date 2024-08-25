
# WhiteSpace

**WhiteSpace** is a modern blogging platform that emphasizes simplicity and readability. It is designed to offer a seamless writing and reading experience with a focus on minimalism and functionality. Whether you're a seasoned writer or just starting, WhiteSpace provides the tools you need to share your stories with the world.
## Technologies Used
### Backend

- **Cloudflare Workers with Hono**: Powers the backend infrastructure, providing robust and scalable functionality.

- **Zod**: Used for validation on the backend, ensuring data integrity and security.

- **TypeScript**: Language of choice for backend development, enabling type safety and enhanced developer productivity.

- **Prisma**: ORM (Object-Relational Mapping) tool used for efficient database management.

- **PostgreSQL**: Relational database management system chosen for its reliability and scalability.

- **JWT**: Enables secure user authentication, enhancing the platform's security.

- **Password Hashing**: Implemented to enhance user data security by securely storing passwords.

### Frontend

- **React**: Frontend framework used for building interactive user interfaces.

- **Tailwind CSS**: Styling framework utilized for crafting sleek and responsive UI components.

- **TypeScript**: Language of choice for frontend development, ensuring type safety and code clarity.

- **Zod**: Utilized for frontend type inference and validation, enhancing data consistency and reliability.

## Installation

To get started with WhiteSpace locally, follow these steps:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/mrsamirr/WhiteSpace.git
    cd WhiteSpace
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **The Next Instructions**

- Copy frontend and backend folders here and Open VS code.

- Open 2 terminals:

1. Terminal 1

```

cd backend

```

```

npm install

```

2. Terminal 2

```

cd frontend

```

```

npm install

```

- Create `.env` file in backend folder

```

touch .env

```

- Now add the following fields inside `.env`

```

DATABASE_URL=""

JWT_SECRET=""

```

- Now, inside `wrangler.toml` file add the following fields:

```

[vars]

DATABASE_URL=""

JWT_SECRET=""

```

4. **Start the development server:**
    ```bash
    npm run dev
    ```

   The application will run on `http://localhost:5173`.

5. **Deploy on the server:**
    ```bash
    npm run deploy
    ```

  



