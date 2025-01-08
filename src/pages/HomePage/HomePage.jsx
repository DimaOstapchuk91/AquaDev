import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";
import Container from "../../components/Container/Container";
import WelcomeSection from "../../components/WelcomeSection/WelcomeSection";

const HomePage = () => {
  return (
    <Container>
      <WelcomeSection />
      <AdvantagesSection />
    </Container>
  );
};

export default HomePage;
