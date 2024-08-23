import { styled } from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp as Thumb } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as empyThumb, faComment } from '@fortawesome/free-regular-svg-icons';

import Star from '../common/Star';
import UserProfileWithComment from '../common/UserProfileWithComment';

interface Props {
  setIsExpandedOption: (expanded: boolean) => void;
}
const ReviewItem = ({ setIsExpandedOption }: Props) => {
  const carouselList = [
    'https://flexible.img.hani.co.kr/flexible/normal/970/646/imgdb/original/2023/0119/20230119503755.jpg',
    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxESEBUQDxAQFg8XEhYVGBUWFhUVFRUWFxUXFhUSFhUYHSggGBolGxcVITEjJSkrLi4uFx8zODMtNygtLisBCgoKDQ0NDg0NDisZFRkrNy0tKys3LSstKystKy0rLSsrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIANAA8wMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAAAQQCAwUHBgj/xAA7EAABAwIEAwUGBAUEAwAAAAABAAIRAyEEEjFBBVFhBiJxgZETMqGxwfAHQlLRI2Jy4fEUM5KyFjSi/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAXEQEAAwAAAAAAAAAAAAAAAAAAARFB/9oADAMBAAIRAxEAPwDw5ERAREQEREBERAREQEREBERAREQEREBERAREQEREQRERRERAREQEREBERAREQEREBERAREQEREBERAREQEREQREQEUhIQQiyLd9lBQQiIgIiICIiKIiICIiAiIgIiICIiAiIgIiICIiAiKURCkIkICQsmtPJWMPh51BhBposn9uatswehnkbafur2Cwova5PLQDr4rpihMDe1/p4IK+D4cx4IfTBlpANxlM6i8THTZcPinD3UKppP1Fwf1NOjgvtMBREjXZb+0vB/b4cvYCa1MEjq38zfqg84KKSoQQiIgIiIoiIgIiICIiAiIgIiICIiAiIgKUREEUhSEEALYxsG9ituHp6Eifu330XSwgAuRaIvEaEIKtChJg36K+yjoLn19AFuo4VnvQA639IAbEeO/mrFKx7sRH2FBnhMO6JAGXW5I3iBzXTZgnXt3hJNtACP3CrUa79QdBEdNbLr0WBzb6G59ZPxhBrZQj3QQIbruYuQu9wwyJ6iR8D8FSyA6ax/hXOHNLXxzQeY9s+Ef6bFvpgfw3fxGf0uvHldcJes/ixwrNhaWJaO9Tfkd0a+4+K8nKoxRSoQQiIiiIiAiIgIiICIiAiIiCKUQEREBSsmMnl5mAt1KjbMf31UGqmyVdoYSdBO19OZKyoYb7+a6lDDA68kFBtKDf9lcoU/T7uttTDTsreFBaC2DcesA/ugrMpTeDc6nT05qzQplWG0CWExYOE20PVb6VEblFYU2QurhR3CB0tz5qrTaArmGol5IG0HlCI6OEpSNb8t4XUwlFsSAfEqhSOW286/NdXCt6eHmip7TYY1+H4ilbMaJI2uzvXPhmX5/K/SDaJIcw6Fj2kHq0gfNfnKu2HOHJxHoYVGpQVkoKIxRSoQEREUREQEREBERAUoiIIimEBZNasm0uZj5q3hcO4uETA0Hw+qg00cO4gGLTabTuV0uH4MwMwIJ717ROkfe630MOQ9sg5gYFxAsQDfYfOF0MLh3OcC8nJlIFw5xJtPlzQY0MHMSfLw3ldLDYWdoG5gmwGnmtzcI0CWzcXk6X0Vqg07WJ52QaKmDEx0F7esKDQbNxYnbQWF/grr6RmC4TcmdP8rn15OkwqMmV2kEaB2o2nn6LFovH+FXYzaFcpnSdAICUM2MAHVdbgtAgk30jxlV+H4MGHEmNI5ydl9PgKYHj9wgqDCd4EzEwupSAG+iypUvArP2YJiLorbw8TUvzE+ZhfnfjFLJiKreVV4/8Aor9G4QfxG2tmF+UEL85cYfmxFV3Oq/8A7FTRSKhSVCqIRFCAiIgIiIoiIgIimEQRSiAtlFhJnKXAagA/RTQo5nQAdCfICSfAQV2KFCplDaQcIBcSH5RDoIn9VosoNOAwwc8veHhrYJlpidi7kP2XQwlAkBwgggnMBlJ1587DoFcp4cZWUiajiTncLil3RAmbnmrbcGXCxmNJZYHm0A2AVGihTBhvhtqdLn/Gi6FPCw6DA2Hjt/lSyneNyT6CLkDxVykLWa6TMG4IBkSdx4dQoGHw9pjpqLdbLo4XBEkuAsPhbc6+izwwIGRpOUCI59ST1urrKYptmZvAA6auKo5eNwpDZnmYiAb6Lj5Tcxv9hfSVMU05sw70GL2K4r2a6xqEFaTItEbLbIvYraKMXsVAZsFRfwb4aIMeXwX0OAYQ3O4iCRA5DdfPcMoF7oMZRBNuq+swuGAZIAs428h8FJVtwjmm8+FlYoNBMm+/JVaUg7kxfkPNWQ5xaCfAKDZ7XIypUOjKb3f8Wkj6L8z135nF3Ml3qZXvvbjG/wCn4biHzD3tFFp61Dr6A+q/P7kGJUFSVCqIUKVCAiIgIiIoiIgKUCBESFZwmFLjYHodrXKxw9NpIBJ1v9I8128FSL5cWwycoFge9Bt1gfFBGCwQJhwbctaCTAAc52cgfmJAiOq6jKbXGGtYYZMOEG5gG1oEBZ0qRGUii1jILrnPUeScwvs24C6FHDghz3vGZxbE5Rla0EeQseqCKNB0Wvz894W+kwixF7aC/hB0W6lhiWWmDBkHKeav0qTCQGtNhOu3j4oKjbAjKZJ+ok+m5VzC05jpy3J0E76qwMOC3QfPXTx/srjcE5pB5NAjXXfogywtEAjMDF7DXrdZYgMDe9IJNh96rfh3imCYvpJVWpjbklBQ9hJsLTqrOHwFNt3NkSPTWFuw5DnOAjoVbq0cobpOqDkcUotaW5WwL+EH6qqylJBJhdbFvbGV0zMxC14cst6En6IMuH4QsqSHSC2PNfQV64p08ljPevueSo8LaMziNNvLktPFXy+DsPnoisadYySCQd/2XbwYMCd9Bt5r5tkl0AGZX1OCa2mxz6joptaXOJNg1okqDzb8beJj+Bg2nQGs+P5rMB8l5SV1+1XGXYzF1cSdHvOUcmCzB0t81yJVhEFQiIIKhSVCKIplEEIiICIiIlZtZzMCY+wsF1OA4cPrBuVrjOjtI59fBBc4dQYHMyAiqA7vPFnOg+6LD3ZN9F2sJhYa22Z0N07o3BdMX7oJVrDcOyy13swcocW9/ND3mc7dCbREQAugMPlPutEjnsQLCCQBA2jTdBowtEh0tAzERmi9ptcgALdQw8ACKbov32zmkTY6WmJV1lEAGRqNBN7i3OJjxEqwzDz7osBtEDYeG4tCCadFxEnU25HwWykyIBA1m+p6LcKJAm8LeKc3dM7Hn0QYMaJhojTQQBeyuBpAtMz5lashJ6bQrFOm6Jvebzy6oNFTOQBAjefuy5zYmDMzp/ZdoA7NKwZTg+0LQD+3XZBrwuEIOggjf6rPiOhAyxYGNjzJVhrnEGWj3pEG8czzVHGU4MZrEzbrq0cxogpVHyS4/fh+6wzWN45DdbW0Xb/BbHYQ780HU4MyKYJmSSZPotuIwQebGHaGdPNa+HtDBlk9BefIK1h85eYygTmsLnS7idYARUYTh7GEO2Fh/Mb3Xxv4u9pRTot4fRPfqAPqkflp/lpz/Mb+A6r6Ltj2jp4GlnMOqXDKf63GZFvyjUnpGpXg3EMbUrVX1qrs1R7i5x5k/IDQDYAKCuSsSpUFVEFEUIChTKhFEREBERAREREhbKNQtcHNJDgZBFiDzC1hTKD0rstxduJa/wBo8/6gd5wIBGUCMzBrPMdV9JSwrcxLAQ6AM0QcpBMWtp814th8Q5jmvYS14MgjUHmvUezXbGliAKeId7PEkRm0ZU5ETZrum6DuU8MBAm1u8bab2+7LY2m1wJcRkvaDObNzHK66DKYiIM5QTPP5LH2HO9/NRWNChJg2tZbvYRciCTad1FMGTA5x481up1P1C43VGoMgmYt6dFuy2HgfATyWxrmmxkD5q3h6TYtfxQVaNHWx1WuvQtcrtPptj3SB8yqtWlNxog4rHEusPAR8+iye4vOgFvvwXUflDS0iZF+fqqrGOm0BsINmFwAc2XFaqeFa12pIkwrtMfZWTqcXO3ogr06MEkAZtB/foseOcaoYPDurV3C1mtEZnugwxjefXQDVcntb2po4JvfP8Yju0h77urv0t8V4tx/jdbF1fa13SYhrR7rG8mj5ndQZdo+OVcZXdXq2mzWAy1jB7rB8ydzdcooSsSqgoRQglQihAKIiKIiICIiAiIgkIoUhESsgViiD6/sz26r4eKdaa2HAiCYez+l30K9L4L2jwmKvRqjOR7h7tQeLTY+I9F4MCsmuMyNUH6HrENvpeLgrMPa4CYnnsV4xwntvjaADBUFSmLZKoziOQdZw8ivqMJ+JNB3+/halM2vSLKgPUtflI/5KD0LIVZpPMCNl8hR7b8NI/wDZew/pdTqtI9Mw+K6dPtRgjpjcJHMvgn1ARX0zaxI7zjKFw/X8IK4H/lmAETi8JG/8SflK1VO3fCWXdig53JjKr/KcsfFUd/JP91m3B7kT0+9F8NjvxYwTZ9hhsRUdtm9nQZ4zLnfBfK8W/FTH1JGH9lhmc6YzVfOo+SPKEHsHEMRRwzPaYqpTos/nME9Gt1d5Bea9qvxRmafD2Fon/eeLnqxm3iV5tjMbVquz1qlR7z+Z7i53qVXJURuxOKfUcX1HOc91y5xJJPitBKFRKoIiiUBQURAUIiAiIiiIiAiIgIiICIiIlSoRBKlYqZUGUoCoRUZApKxUqDIFJWCIMkJWKIJlQiKgVCIUBQiIChEQEREUREQEREBERAREQEREBSoRESihFBkkrFEGSLFEGUosUQZJKxRBlKLFEEooRBKhEVBERFEREBERAREQf//Z',
  ];
  const text = '부모님과 함께 다녀왔다.다음 휴가 때 또 가고싶을정도로 즐거웠다.';
  const myLike = false;
  const commentCount = 12;
  const likeCount = 70;

  return (
    <ReviewItemStyle>
      <UserProfileWithComment name={'변성은'} date={'24.01.05'} setIsExpandedOption={setIsExpandedOption} />
      <div className="review-content">
        <div className="review-star">
          <Star rating={3.5} showRatingValue={false} size={16} gap={4} color="keyColor" />
        </div>
        <div className="slide">
          {carouselList?.map(item => {
            return (
              <li className="review-img">
                <img src={item} alt="" className="review-img" />
              </li>
            );
          })}
        </div>
        <div className="review-text">{text}</div>
      </div>
      <div className="review-info">
        <div className="count">
          <FontAwesomeIcon className="icon" icon={myLike ? Thumb : empyThumb} onClick={() => {}} />
          <div className="count-text"> {likeCount}</div>
        </div>
        <div className="count">
          <FontAwesomeIcon className="icon" icon={faComment} onClick={() => {}} />
          <div className="count-text">{commentCount}</div>
        </div>
      </div>
    </ReviewItemStyle>
  );
};

const ReviewItemStyle = styled.div`
  padding-top: 24px;
  padding-bottom: 32px;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray40};

  .review-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .review-star {
      margin-bottom: 16px;
      margin-top: 4px;
    }

    .slide {
      overflow-x: scroll;
      display: grid;
      grid-auto-flow: column;
      list-style: none;
      gap: 14px;
      max-width: 100%;

      -ms-overflow-style: none; /* 인터넷 익스플로러 */
      scrollbar-width: none; /* 파이어폭스 */

      .review-img {
        width: 240px;
        height: 240px;
        border-radius: 12px;
      }
    }

    .slide::-webkit-scrollbar {
      display: none;
    }
    .review-text {
      padding: 20px 0;
    }
  }
  .review-info {
    display: flex;
    gap: 24px;

    .count {
      align-items: center;
      display: flex;
      gap: 4px;
      .icon {
        path {
          color: ${({ theme }) => theme.color.subColor1};
        }
      }
      .count-text {
        color: ${({ theme }) => theme.color.gray80};
      }
    }
  }
`;

export default ReviewItem;
