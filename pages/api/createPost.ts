import prisma from "../../prisma/client"
import type { NextApiRequest, NextApiResponse } from "next";

type postProps = {
    title: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const post: postProps = JSON.parse(req.body)
        console.log(post);
    if (req.method === 'POST') {
        if(!post.title.length) {
            return res.status(500).json({ message: 'Please do not leave this emplty'})
        }
        try {
            const data = await prisma.post.create({
                data: {
                    title: post.title
                }
            })
            res.status(200).json(data)
        } catch (err) {
            return res.status(500).json({ message : "Error createing a new post"})
        }
    }
        } catch (err) {
            return res.status(500).json(err)
        }
    }

