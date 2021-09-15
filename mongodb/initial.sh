#!/usr/bin/sh
mongo -u ${MONGO_INITDB_ROOT_USERNAME} -p ${MONGO_INITDB_ROOT_PASSWORD}<<EOF
    use ${MONGO_INITDB_DATABASE}
    db.users.createIndex({username: 1}, {unique: true})
    db.users.insertOne({"__v": 0,"username": "ilhamgibran.am","name": "Ilham Gibran Achmad Mudzakir","password": "\$2a\$10\$K.5jGhcPTPUnrL49aR.p9eS6RHvr6FmYEkO6b5uLC46uJoqUbjrJa","role": "Admin"})
    db.users.insertOne({"__v": 0,"username": "haura.kp","name": "Haura Khalista Putri","password": "\$2a\$10\$K.5jGhcPTPUnrL49aR.p9eS6RHvr6FmYEkO6b5uLC46uJoqUbjrJa","role": "User"})
EOF