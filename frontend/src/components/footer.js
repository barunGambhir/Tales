import { faFacebook, faTwitter, faTiktok, faLinkedinIn, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { Box, Container, SimpleGrid, Stack, Text, HStack, Center } from "@chakra-ui/react";
import SocialIcons from "./SocialIcons";

const Footer = () => {
	let current_year = new Date().getFullYear();
	return (
		<Box bg="#0d6efd" >
			<Container as={Stack} py={50}>
				<center>
					<SimpleGrid spacing={8}>
						<Stack spacing={6}>
							<Box>
							</Box>
							<Center>
								<HStack spacing="24px">
									<SocialIcons icon={faFacebook} href="https://www.facebook.com/" />
									<SocialIcons icon={faTwitter} href="https://twitter.com/" />
									<SocialIcons icon={faInstagram} href="https://www.instagram.com/" />
									<SocialIcons icon={faLinkedinIn} href="https://www.linkedin.com/" />
									<SocialIcons icon={faTiktok} href="https://www.tiktok.com/" />
								</HStack>
							</Center>
							<Text color="white" fontSize={"sm"}>&copy; {current_year} Tales Platform - All Rights Reserved</Text>
						</Stack>
					</SimpleGrid>
				</center>
			</Container>
		</Box>
	);
};

export default Footer;
