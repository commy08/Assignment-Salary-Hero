# Assignment-Salary-Hero

- create file ".env" and set the value (You can see example ".env" file in ".env.example" file)
- run npm command

```shell
npm i
npm run dev
```

- please add "usercompanyrole" to the headers before requesting the API and you can add limit and offset to the headers to paginate the data

  ```
  curl --location --request GET 'http://localhost:8000/api/company' \
  --header 'usercompanyrole: eed99b1d-2633-44c8-af52-8fcccf8154c3' \
  --header 'limit: 10' \
  --header 'offset: 0'
  ```
