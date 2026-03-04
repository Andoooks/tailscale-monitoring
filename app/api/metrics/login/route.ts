import bcrypt from "bcryptjs";

const USER = "admin";
const HASH = bcrypt.hashSync("ChangeMe@123!", 10);

export async function POST (req: Request) {
    const { username, password } = await req.json();

    if (username === USER && bcrypt.compareSync(password, HASH)) {
        return new Response("ok");
    }
    return new Response ("Invalid", {status: 401});
}