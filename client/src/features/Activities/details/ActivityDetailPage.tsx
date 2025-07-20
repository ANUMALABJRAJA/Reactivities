import {  Grid2, Typography } from "@mui/material"
import { useParams } from "react-router";
import { useActivities } from "../../../lib/hooks/useActivities";
import ActivityDetailsInfo from "./ActivityDetailsInfo";
import ActivityDetailsHeader from "./ActivityDetailsHeader";
import ActivityDetailsSideBar from "./ActivityDetailsSideBar";
import ActivityDetailsChat from "./ActivityDetailsChat";



export default function ActivityDetailsPage() {
    const {id} = useParams();
    const {activity,isLoadingActivity} = useActivities(id)
    if(isLoadingActivity) return <Typography>Loading....</Typography>

     if(!activity) return <Typography>Activity Not found..</Typography>
    return (
        <Grid2 container spacing={3}>
            <Grid2 size={8}>
                <ActivityDetailsHeader activity={activity} />
                <ActivityDetailsInfo activity={activity}/>
                <ActivityDetailsChat/>
            </Grid2>
            <Grid2 size={4}>
                <ActivityDetailsSideBar/>
            </Grid2>
        </Grid2>
  )
}
