import express, { Request, Response } from "express";
import dotenv from "dotenv";
import getVideoFromYoutube from "./util/getVideoFromYoutube";
import { createVideo } from "./supabaseConfig/service";

dotenv.config();

const app = express();
app.use(express.json());

app.post("/update/period", async (req: Request, res: Response) => {
    try {
        const { startingDate, endDate } = req.body;

        if (startingDate === undefined || endDate === undefined) {
            res.send({ ok: false, message: "must send year and month" });
            return;
        }

        const regexp = /^\d{4}-\d{2}-\d{2}$/;

        if (!regexp.test(startingDate) && !regexp.test(endDate)) {
            res.send({ ok: false, message: "invalid format" });
            return;
        }

        const video = await getVideoFromYoutube(startingDate, endDate);

        const result = await Promise.all(
            video.data.items.map(async (value) => {
                const { videoId } = value.id;
                const { thumbnails, publishedAt, title } = value.snippet;

                return await createVideo(
                    videoId,
                    thumbnails,
                    publishedAt,
                    title
                );
            })
        );

        res.send({ result });
    } catch (e: unknown) {
        console.error(e);
        res.send({ ok: false, message: e });
    }
});

app.listen(9090, () => {
    console.log("Server is loaded");
});
