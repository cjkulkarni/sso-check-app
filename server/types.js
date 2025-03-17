

class User {
    _id;
    name;
    email;
    password;
}
class Blog {
    _id;
    name;
    content;
    image;
}

class AuthRequest extends Request{
    userId;
}

export { User,Blog,AuthRequest }