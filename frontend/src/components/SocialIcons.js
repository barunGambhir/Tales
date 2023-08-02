import { Link } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SocialIcons = (props) => {
	return (
		<Link href={props.href} color="white" style={{ textDecoration: "none" }} isExternal>
			<FontAwesomeIcon icon={props.icon} size="xl" />
		</Link>
	);
};

export default SocialIcons;