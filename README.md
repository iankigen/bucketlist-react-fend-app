# React Bucket list app

Bucketlist application using react library that allows a user do the following:

- Register and login.
- Create, update, view and delete a bucket list.
- Add, update, view or delete items in a bucket list.

## Testing API


```
$ git clone https://github.com/iankigen/React-Bucket-List-app.git
$ cd react-bucket-list
$ npm install
```

## Start The Server
Start the server which listens at port 3000 by running the following command:
```
npm start
```


### Available Endpoints

| Endpoint | Description |
| ---- | --------------- |
| [POST /signup](#) |  Register user. Request should have _name_ and _password_ in form data. |
| [POST /login](#) | Login user. Session token is valid for 30 minutes. |
| [POST /logout](#) | Logout user. |
| [POST /bucketlists/](#) | Create a new bucket list. Request should have _desc_ in form data. |
| [GET /bucketlists/](#) | List all the created bucket lists. |
| [GET /bucketlists/:id](#) | Get single bucket list. |
| [PUT /bucketlists/:id](#) | Update single bucket list. Request should have _desc_ in form data. |
| [DELETE /bucketlists/:id](#) | Delete single bucket list. |
| [POST /bucketlists/:id/items](#) | Add a new item to this bucket list. Request should have _goal_ in form data. |
| [PUT /bucketlists/:id/items/:item_id](#) | Update the bucket list completion status to true. |
| [DELETE /bucketlists/:id/items/:item_id](#) | Delete this single bucket list item. |

### Testing

[ Link: Bucketlist Front end ](https://bucket-front.herokuapp.com/)









