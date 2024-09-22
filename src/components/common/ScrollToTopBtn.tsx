import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <ScrollButton onClick={scrollToTop} isVisible={isVisible}>
      <FontAwesomeIcon icon={faChevronUp} className="up-icon" />
    </ScrollButton>
  );
};

const ScrollButton = styled.button<{ isVisible: boolean }>`
  position: fixed;
  bottom: 95px;
  right: 20px;

  padding: 10px 15px;

  background-color: ${({ theme }) => theme.color.subColor1};
  border: none;
  border-radius: 50px;

  opacity: ${({ isVisible }) => (isVisible ? '1' : '0')};
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  transition: opacity 0.3s, visibility 0.3s;

  .up-icon {
    path {
      color: white;
    }
  }

  &:hover {
    background-color: ${({ theme }) => theme.color.subColor};
  }
`;

export default ScrollToTopButton;
