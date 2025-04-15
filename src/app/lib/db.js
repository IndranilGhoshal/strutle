const {username, password, database} = process.env
export const connectionStr = "mongodb+srv://"+username+":"+password+"@cluster0.hn6su.mongodb.net/"+database+"?retryWrites=true&w=majority&appName=Cluster0"


