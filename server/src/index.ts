import express, { Request, Response } from "express";
import dotenv from "dotenv";
import dayjs from "dayjs";
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

        // 시작하는 날과 끝나는 날이 서로 다를 경우 그 사이의 모든 달을 구하는 로직
        const periodArray = [];

        let currentDate = dayjs(startingDate);

        while (!currentDate.isSame(endDate, "month")) {
            periodArray.push({
                startingDate: currentDate.format("YYYY-MM-DD"),
                endDate: currentDate.endOf("month").format("YYYY-MM-DD"),
            });

            currentDate = currentDate.add(1, "month");
        }
        periodArray.push({
            startingDate: currentDate.format("YYYY-MM-DD"),
            endDate,
        });

        const videoArray = await Promise.all(
            periodArray.map(async ({ startingDate, endDate }) => {
                const result = await getVideoFromYoutube(startingDate, endDate);

                return result.data.items;
            })
        );

        const result = await Promise.all(
            videoArray.flat().map(async (video) => {
                const { videoId } = video.id;
                const { thumbnails, publishedAt, title } = video.snippet;

                const result = await createVideo(
                    videoId,
                    thumbnails,
                    publishedAt,
                    title
                );

                return result;
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
