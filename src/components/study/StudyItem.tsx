import { StudyInfo } from '@components/study/studyDefines';
import { useRouter } from 'next/navigation';
import { commonFont } from '@utils/font';
import { Color } from '@defines/common/color';

export default function StudyItem(props: StudyInfo) {
  const { title, description, href } = props;
  const router = useRouter();

  const handleClickStudyItem = () => {
    router.push(`/study${href}`);
  };

  return (
    <>
      <div className={'study-item'} onClick={handleClickStudyItem}>
        <span className={'title'}>{title}</span>
        <span className={'description'}>{description}</span>
      </div>
      <style jsx>{`
        .study-item {
          display: flex;
          flex-direction: column;
          gap: 5px;
          border-top: 1px solid ${Color.CG80};
          border-bottom: 1px solid ${Color.CG80};
          padding: 5px 10px;
          cursor: pointer;

          .title {
            ${commonFont('20px', 600)};
          }

          .description {
            ${commonFont('15px')};
          }
        }
      `}</style>
    </>
  );
}
