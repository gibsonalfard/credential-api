#!/usr/bin/sh
mongo -u ${MONGO_INITDB_ROOT_USERNAME} -p ${MONGO_INITDB_ROOT_PASSWORD}<<EOF
    use ${MONGO_INITDB_DATABASE}
    db.users.createIndex({email: 1}, {unique: true})
    db.users.insertOne({"__v": 0,"createdAt": {"\$date": "2021-09-13T09:53:27.941Z"},"email": "ilhamgibran.am@gmail.com","name": "Ilham Gibran Achmad Mudzakir","password": "\$2a\$10\$K.5jGhcPTPUnrL49aR.p9eS6RHvr6FmYEkO6b5uLC46uJoqUbjrJa","role": "Admin","updatedAt": {"\$date": "2021-09-13T09:53:27.941Z"}})
EOF