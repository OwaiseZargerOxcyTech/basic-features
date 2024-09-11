import { Box, Grid,Paper, Container, Typography, Button } from '@mui/material';
import React from 'react';
import { styled } from '@mui/material/styles';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import { CircularWithLabel } from './CircularWithLabel';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Download } from '@mui/icons-material';
import { ChartComponent } from './ChartComponent';

const Dashboard: React.FC = () => {

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.primary,
      }));


    return (
        <Box sx={{ p: {xs:4} }} >
            <Container>
                <Grid container spacing={3}>
                    <Grid item xs={6} md={3}>
                        <Item>
                            <Box sx={{ width: "80%", display: "flex", border: "1px solid white", m: "auto"}}>
                                <BookmarkBorderOutlinedIcon sx={{ mt: '4px', fontSize: "35px"}}/>
                                <Box sx={{ ml: '25px', border: "1px solid white", textAlign: "left"}}>
                                    <Typography variant="h5" sx={{ fontWeight: 700}}>2,478</Typography>
                                    <Typography component="p" >Total Invoices</Typography>
                                </Box>
                            </Box>
                            <Box>
                                <SparkLineChart
                                    data={[3, 10, 2, 5, 7, 2, 4, 6]}
                                    height={60}
                                    width={250}
                                    curve="natural"
                                    area
                                />
                            </Box>
                        </Item>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Item>
                            <Box sx={{ width: "80%", display: "flex", border: "1px solid white", m: "auto"}}>
                                <BookmarkBorderOutlinedIcon sx={{ mt: '4px', fontSize: "35px"}}/>
                                <Box sx={{ ml: '25px', border: "1px solid white", textAlign: "left"}}>
                                    <Typography variant="h5" sx={{ fontWeight: 700}}>983</Typography>
                                    <Typography component="p" >Paid Invoices</Typography>
                                </Box>
                            </Box>
                            <Box>
                                <SparkLineChart
                                    data={[3, 10, 2, 5, 7, 2, 4, 6]}
                                    height={60}
                                    width={250}
                                    curve="natural"
                                    area
                                />
                            </Box>
                        </Item>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Item>
                            <Box sx={{ width: "80%", display: "flex", border: "1px solid white", m: "auto"}}>
                                <BookmarkBorderOutlinedIcon sx={{ mt: '4px', fontSize: "35px"}}/>
                                <Box sx={{ ml: '25px', border: "1px solid white", textAlign: "left"}}>
                                    <Typography variant="h5" sx={{ fontWeight: 700}}>1,256</Typography>
                                    <Typography component="p" >Unpaid Invoices</Typography>
                                </Box>
                            </Box>
                            <Box>
                                <SparkLineChart
                                    data={[3, 10, 2, 5, 7, 2, 4, 6]}
                                    height={60}
                                    width={250}
                                    curve="natural"
                                    area
                                />
                            </Box>
                        </Item>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Item>
                            <Box sx={{ width: "80%", display: "flex", border: "1px solid white", m: "auto"}}>
                                <BookmarkBorderOutlinedIcon sx={{ mt: '4px', fontSize: "35px"}}/>
                                <Box sx={{ ml: '25px', border: "1px solid white", textAlign: "left"}}>
                                    <Typography variant="h5" sx={{ fontWeight: 700}}>652</Typography>
                                    <Typography component="p" >Total Invoices</Typography>
                                </Box>
                            </Box>
                            <Box>
                                <SparkLineChart
                                    data={[3, 10, 2, 5, 7, 2, 4, 6]}
                                    height={60}
                                    width={250}
                                    curve="natural"
                                    area
                                />
                            </Box>
                        </Item>
                    </Grid>
                </Grid>
            </Container>
            <Container sx={{ mt: "25px"}}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Item>
                            <Container sx={{ display: 'flex', gap:'25px'}}>
                                <Box sx={{ width: '290px'}}>
                                    <Typography variant='h6' sx={{ textAlign: 'left', fontWeight: "600", fontFamily: 'roboto, sans-serif'}}>Spendings</Typography>
                                    <Box sx={{ mt: '25px', display: 'flex', flexDirection: 'column', justifyItems: 'left', gap: '25px' }}>
                                        <Box sx={{ height: '45px', background:'linear-gradient(to left bottom, #b738d8, #d738c7)', borderRadius:'15px', width: '10px'}}>
                                            <Typography sx={{ paddingLeft: '20px', color: 'grey'}}>Investment</Typography>
                                            <Typography sx={{ paddingLeft: '20px', fontWeight: "600", }}>$1,415<span style={{ color: 'lightGrey'}}>/$2,000</span></Typography>
                                        </Box>
                                        <Box sx={{ height: '45px', background: "linear-gradient(to left bottom, #3fd5a8, #3fc3c4)", borderRadius:'15px', width: '10px'}}>
                                            <Typography sx={{ paddingLeft: '20px', color: 'grey'}}>Installment</Typography>
                                            <Typography sx={{ paddingLeft: '20px', fontWeight: "600", }}>$1,567<span style={{ color: 'lightGrey'}}>/$5,000</span></Typography>
                                        </Box>
                                        <Box sx={{ height: '45px', background: "linear-gradient(to left bottom, #ff8379, #ffa137)", borderRadius:'15px', width: '10px'}}>
                                            <Typography sx={{ paddingLeft: '20px', color: 'grey'}}>Restaurant</Typography>
                                            <Typography sx={{ paddingLeft: '20px', fontWeight: "600", }}>$487<span style={{ color: 'lightGrey'}}>/$10,000</span></Typography>
                                        </Box>
                                        <Box sx={{ height: '45px', background: "linear-gradient(to right top, #23abe6, #471ee8)", borderRadius:'15px', width: '10px'}}>
                                            <Typography sx={{ paddingLeft: '20px', color: 'grey'}}>Property</Typography>
                                            <Typography sx={{ paddingLeft: '20px', fontWeight: "600", }}>$3,890<span style={{ color: 'lightGrey'}}>/$4,000</span></Typography>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box>
                                    <Grid container columnSpacing={4} rowSpacing={4}>
                                        <Grid item xs={6}>
                                            <Item sx={{ 
                                                background: "linear-gradient(to left bottom, #b738d8, #d738c7)",
                                                padding: '20px',
                                                borderRadius: "18px"
                                            }}>
                                                <CircularWithLabel value={76}/>
                                                <Typography sx={{ color: "white"}}>Investment</Typography>
                                            </Item>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Item sx={{ 
                                                background: "linear-gradient(to left bottom, #3fd5a8, #3fc3c4)",
                                                padding: '20px',
                                                borderRadius: "18px"
                                            }}>
                                                <CircularWithLabel value={30} />
                                                <Typography sx={{ color: "white"}}>Installment</Typography>
                                            </Item>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Item sx={{ 
                                                background: "linear-gradient(to left bottom, #ff8379, #ffa137)",
                                                padding: '20px',
                                                borderRadius: "18px"
                                            }}>
                                                <CircularWithLabel value={5} />
                                                <Typography sx={{ color: "white"}}>Restaurant</Typography>
                                            </Item>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Item sx={{ 
                                                background: "linear-gradient(to right top, #23abe6, #471ee8)",
                                                padding: '20px',
                                                borderRadius: "18px"
                                            }}>
                                                <CircularWithLabel value={96} />
                                                <Typography sx={{ color: "white"}}>Property</Typography>
                                            </Item>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Container>
                        </Item>
                        <Item sx={{ mt:'25px'}}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between',border: '1px solid white', pt: '10px'}}>
                                <Box sx={{ textAlign: 'left', border: '1px solid white'}}>
                                    <Typography sx={{ fontWeight: '600'}}>Transaction Overview</Typography>
                                    <Typography sx={{ color: 'grey', fontWeight: '600'}}>Lorem ipsum dolor sit amet, consectetur</Typography>
                                </Box>
                                <Box>
                                    <Button variant="outlined" startIcon={<Download />} color='success' sx={{ border: '1px solid', borderRadius: '15px'}}>Download Report</Button>
                                </Box>
                            </Box>
                            <ChartComponent />
                        </Item>
                        <Item sx={{ mt:'25px'}}>
                            <Box>
                                <Typography sx={{ ml: '25px', mt: '10px', textAlign: 'left', color: 'grey', fontWeight: 'bolder'}}>Weekly Wallet Usage</Typography>
                                <Typography variant='h5' sx={{ml: '25px',textAlign: 'left',fontWeight: 'bolder', fontSize: '35px'}}>
                                    <ArrowDropUpIcon sx={{ fontSize: '30px',color: 'lightGreen'}}/>43%
                                    <span style={{ fontWeight: '200', color: 'lightGrey', fontSize: '15px', marginLeft: '15px'}}>Than last week</span>
                                </Typography>
                            </Box>
                            <SparkLineChart
                                data={[2,5,3,2,7,6,8,4,6,7,2,4,8,6,5,3]}
                                height={100}
                                curve="natural"
                                area
                            />
                        </Item>
                    </Grid>

                    <Grid item xs={6}>
                        <Item>Card 2</Item>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default Dashboard;