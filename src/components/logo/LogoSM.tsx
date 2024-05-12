import { Box } from "@mui/material";
import { StampSVG, LogoSVG } from '../../assets/svg/_index';

const LogoSM: React.FC<{ dir?: string, color?: string }> = ({ dir = 'horizontal', color = 'blue' }) => {
    return (
        <>
            {
                color === 'white' ?
                    <Box sx={{ mt: 4, display: "flex", justifyContent:"space-evenly" }}>
                        <Box sx={{ mt: 1 }}>
                            <StampSVG color={'#fff'} width="100%" height="80" />
                        </Box>
                        <Box>
                            <LogoSVG color={'#fff'} width="100%" height="80" />
                        </Box>

                    </Box>
                    : <>
                        {
                            dir === 'vertical' ? <>
                                <Box>
                                    <LogoSVG />
                                </Box>
                                <Box sx={{ mt: 1 }}>
                                    <StampSVG />
                                </Box>
                            </> : <>
                                <Box sx={{ mt: 1 }}>
                                    <StampSVG />
                                </Box>
                                <Box>
                                    <LogoSVG />
                                </Box>
                            </>
                        }
                    </>
            }
        </>
    );
}

export default LogoSM;