import { memo } from 'react';
import { useLocation } from 'react-router-dom';
import { push } from 'connected-react-router';
import Button from 'components/Custom/Button';
import { useDispatch } from 'hooks/useRedux';

interface SectionQuotationProps {
  reference: string;
  date?: string;
}

const SectionQuotation = ({ reference, date }: SectionQuotationProps) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const onClickQuotation = (e: React.MouseEvent<HTMLAnchorElement>, reference: string) => {
    e.preventDefault();
    dispatch(push(`${location.pathname}/quotation/${reference}`));
  };

  return (
    <div
      className="timeline timeline-one-side"
      data-timeline-axis-style="dashed"
      data-timeline-content="axis"
    >
      <div className="timeline-block">
        <span className="timeline-step badge-default">
          <i className="ni ni-collection" />
        </span>
        <a href="" onClick={(e) => onClickQuotation(e, reference)}>
          <div className="timeline-content">
            <h4 className="mb-0">{reference}</h4>
            <small className="text-muted font-weight-bold">{date}</small>
            <div className="mt-3">
              <Button color="primary" size="sm">
                Revise
              </Button>
              <Button color="primary" size="sm">
                Preview
              </Button>
              <Button color="primary" size="sm">
                Download
              </Button>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default memo(SectionQuotation);
