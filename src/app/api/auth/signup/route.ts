import { dbConnect } from '../../../../utils/mongoodb';
import User from '../../../../models/User';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { username, email, password } = await req.json();

    // Validate input
    if (!username || !email || !password) {
      return NextResponse.json({ message: 'Username, email, and password are required' }, { status: 400 });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

// export async function POST(req: NextApiRequest, res: NextApiResponse) {
//   await dbConnect();

//   const { username, email, password } = await req.body;

//   try {
//     // Check if the user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new user
//     const newUser = new User({ username, email, password: hashedPassword });
//     await newUser.save();

//     return res.status(201).json({ message: 'User created successfully' });
//   } catch (error) {
//     console.error('Error creating user:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// }

// export async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     const { username, email, password } = req.body;

//     try {
//       await dbConnect();
//       // Check if the email already exists in the database
//       const existingUser = await User.findOne({ email });

//       if (existingUser) {
//         return res.status(400).json({ error: 'Email already exists' });
//       }

//       const hashedPassword = await bcrypt.hash(password, 10);

//       const newUser = new User({ username, email, password: hashedPassword });
//       await newUser.save();

//       res.status(201).json({ message: 'User created successfully' });
//     } catch (error) {
//       console.error('Error creating user:', error);
//       res.status(500).json({ error: 'Server error' });
//     }
//   } else {
//     res.status(405).json({ error: 'Method not allowed' });
//   }
// }


// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).end();
//   }

//   const { username, email, password } = req.body;

//   try {
//     await dbConnect();

//     const hashedPassword = bcrypt.hashSync(password, 10);

//     const newUser = new User({
//       username,
//       email,
//       password: hashedPassword,
//     });

//     await newUser.save();

//     res.status(201).json({ message: 'User created successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// }
