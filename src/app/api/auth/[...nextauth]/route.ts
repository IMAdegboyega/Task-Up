// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// export const authOptions = {
//   debug: true, // Enable debugging
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         console.log("Received credentials:", credentials); // Debug log
//         return { id: "1", email: credentials.email };
//       }
//     })
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
// };
