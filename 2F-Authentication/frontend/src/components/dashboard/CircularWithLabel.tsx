import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export const CircularWithLabel = (
  props: CircularProgressProps & { value: number },
) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress
            variant="determinate"
            sx={{
            color: 'grey', // color of the unfilled portion
            }}
            size={75}
            thickness={6}
            value={100}
        />
      <CircularProgress sx={{ color: 'white', // color of the filled portion
          position: 'absolute',
          left: 0,}} size={75} thickness={6} variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          color="white"
          sx={{ fontSize: "20px", fontWeight: "400"}}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

// export default CircularWithLabel;