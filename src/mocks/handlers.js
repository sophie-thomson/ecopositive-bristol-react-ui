import { rest } from "msw"

const baseURL = "https://ecopositive-api-pp5-ba0d580957dc.herokuapp.com/"

export const handlers = [
    rest.get(`${baseURL}dj-rest-auth/user/`, (req,res,ctx) => {
        return res(
            ctx.json({
                "pk": 4,
                "username": "RobinR",
                "email": "",
                "first_name": "",
                "last_name": "",
                "profile_id": 4,
                "profile_image": "https://res.cloudinary.com/dz7zpxcqu/image/upload/v1/media/../default_profile_hcui3f"
            })
        );
    }),
    rest.post(`${baseURL}dj-rest-auth/logout/`, (req,res,ctx) => {
        return res(ctx.status(200));
    }),
];