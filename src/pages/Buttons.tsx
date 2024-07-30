import Button from '../components/common/Button';

const Buttons = () => {
  return (
    <>
      <Button size="large" scheme="keyButton">
        로그인
      </Button>
      large / keyButton
      <Button size="large" scheme="subButton">
        작성 완료
      </Button>
      large / subButton
      <Button size="large" scheme="kakao">
        카카오톡 로그인
      </Button>
      large / kakao
      <br />
      <Button size="small" scheme="keyButton">
        Ditto!
      </Button>
      <br />
      small / keyButton
    </>
  );
};

export default Buttons;
