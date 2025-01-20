# Description

## Run on dev
It is necessary to have the **docker engine** running and the **Docker Compose** installed in your system.

1. Rename the **.env.template** file to **.env** and fill the environment variables.

2. To install the required packages, run the following command in your terminal:
    ```bash
    npm install
    ```

3. To build the database, run the following command in your terminal:
    ```bash
    docker compose up
    ```

4. Run prisma migrations
    ```bash
    npx prisma migrate dev
    ```

5. Run the database seed
    ```bash
    npm run seed
    ```

5. To run the application, execute the following command in your terminal:
    ```bash
    npm run dev
    ```