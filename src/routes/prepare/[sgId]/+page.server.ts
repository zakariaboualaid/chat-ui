import { collections } from "$lib/server/database";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { ObjectId } from "mongodb";

export const load: PageServerLoad = async ({ params, locals }) => {
    let studyGuide;

    studyGuide = collections.studyGuides.findOne({
        _id: new ObjectId(params.sgId)
    })

    console.log(studyGuide);

    if (!studyGuide) {
        error(404, "Study Guide Not Found");
    }

    return {
        studyGuide: studyGuide.then((sg) => {
            return {
                ...sg,
                _id: sg?._id.toString(),
            }
        })
    }
};
