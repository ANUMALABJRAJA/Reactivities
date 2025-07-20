import { Box, Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/material"
import { useActivities } from "../../../lib/hooks/useActivities";

type Props = {
  activity: Activity
  selectActivity: (id: string) => void;
  
}
export default function ActivityCard({ activity, selectActivity }: Props) {
  const{deleteActivity} = useActivities();
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography sx={{ color: 'text.secondary', mb: 1 }}>{activity.title}</Typography>
        <Typography variant="body2">{activity.description}</Typography>
        <Typography variant="subtitle1">{activity.city}</Typography>
      </CardContent>

      <CardActions sx={{ display: 'flex', justifyContent: 'space-between', pb: 2 }}>
        <Chip variant="outlined" label={activity.category}></Chip>
        <Box display='flex' gap={3}>
          <Button onClick={() => { selectActivity(activity.id) }} variant="contained" size="medium">View</Button>
          <Button onClick={() => deleteActivity.mutateAsync(activity.id)} 
          color='error' variant="contained" 
          size="medium"
          disabled = {deleteActivity.isPending}
          >Delete
          
          </Button>
        </Box>

      </CardActions>


    </Card>
  )
}
