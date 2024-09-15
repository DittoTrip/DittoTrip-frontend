import styled from 'styled-components';
import AppBar from '../components/common/AppBar';
import ImageUploader from '../components/review/UploadImage';
import TagSlide from '../components/common/TagSlide';
import { useState } from 'react';
import Button from '../components/common/Button';
import AddressSearch from '../components/AddressFinder';
import { useForm } from 'react-hook-form';

export interface ISpotForm {
  name: string;
  address: string;
  pointX: number;
  pointY: number;
  categoryIds: number[];
  hashtagNames: string[];
}

const SpotApply = () => {
  const [addressModalOpen, setAddressModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ISpotForm>();
  const onValid = (data: ISpotForm) => {
    console.log(data);
  };

  return (
    <>
      <SpotApplyStyle>
        <div className="app-bar">
          <AppBar leading={true} title={<div className="title">스팟 신청하기</div>} action={<></>} />
        </div>

        <div className="spot-apply-container">
          <div className="main-img">
            <ImageUploader />
          </div>

          <form onSubmit={handleSubmit(onValid)}>
            <div className="content-wrapper">
              <div className="spot-box">
                <div className="spot-title">
                  이름 <span className="error-msg">{errors?.name?.message}</span>
                </div>
                <input
                  {...register('name', {
                    required: '* 필수 작성 사항입니다',
                  })}
                  className="spot-input"
                  placeholder="스팟의 이름을 알려 주세요!"></input>
              </div>
              <div className="spot-box">
                <div className="spot-title">
                  주소 <span className="error-msg">{errors?.address?.message}</span>
                </div>
                <input
                  {...register('address', {
                    required: '* 필수 작성 사항입니다',
                  })}
                  className="spot-input"
                  placeholder="스팟의 주소는 어떻게 되나요?"
                  readOnly
                  onClick={() => setAddressModalOpen(true)}></input>
              </div>
              <div className="spot-box">
                <div className="spot-title">카테고리</div>
              </div>

              <div className="spot-box">
                <div className="tag-wrapper">
                  <span className="spot-title">태그</span>
                  <span className="tag-length">(4/10)</span>
                </div>
                <TagSlide tagList={['변성은', '권수연', '방명규', '원순재', '양나영', '허인주']} />
              </div>

              <div className="spot-box last-spot-box">
                <div className="tag-wrapper">
                  <div className="spot-title">스틸컷</div>
                </div>
                <ImageUploader />
              </div>

              <Button size="large" scheme="subButton" className="spot-submit-button">
                스팟 등록
              </Button>
            </div>
          </form>
        </div>
      </SpotApplyStyle>
      <AddressSearch setValue={setValue} isOpen={addressModalOpen} setIsOpen={setAddressModalOpen} />
    </>
  );
};

const SpotApplyStyle = styled.div`
  .app-bar {
    .title {
      ${({ theme }) => theme.font.subTitle}
    }
  }

  .spot-apply-container {
    display: flex;
    flex-direction: column;

    .main-img {
      height: 200px;
      border-bottom: solid 1px;
      color: ${({ theme }) => theme.color.gray40};
    }
    .content-wrapper {
      .spot-box {
        margin: 0 18px;
        padding: 21px 0;
        border-bottom: solid 1px;
        color: ${({ theme }) => theme.color.gray40};

        &.last-spot-box {
          border: none;
        }
      }

      .tag-wrapper {
        display: flex;
        align-items: center;
        margin-bottom: 16px;
      }

      .spot-title {
        ${({ theme }) => theme.font.body2}
        margin-right : 4px;
      }

      .tag-length,
      .still-length {
        color: ${({ theme }) => theme.color.gray60};
        ${({ theme }) => theme.font.body4}
      }

      .spot-input {
        outline: none;
        border: none;
        width: 100%;
        cursor: pointer;
        ${({ theme }) => theme.font.body3}
      }

      .review-submit {
        padding: 0 8%;
        display: flex;
        justify-content: center;
      }
    }
  }

  .error-msg {
    color: #0044f1;
    ${({ theme }) => theme.font.body6};
  }
`;

export default SpotApply;
