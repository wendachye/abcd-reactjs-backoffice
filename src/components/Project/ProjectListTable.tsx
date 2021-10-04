import { useRef, useEffect, useState, memo } from 'react';
import styled from 'styled-components';
import { push } from 'connected-react-router';
import { Table, UncontrolledTooltip } from 'reactstrap';
import List from 'list.js';
import { useDispatch } from 'hooks/useRedux';
import { ProjectType } from 'types/Project';
import DeleteProjectModal from './DeleteProjectModal';
import { deleteProject } from 'redux/slices/projectSlice';

const ProjectNameWrapper = styled.td`
  color: #5e72e4;
  cursor: pointer;
`;

const ProjectListTable = ({ projects }: { projects: ProjectType[] }) => {
  const dispatch = useDispatch();
  const tableRef = useRef<HTMLDivElement | null>(null);
  const [modalDeleteVisible, setModalDeleteVisible] = useState<boolean>(false);
  const [deleteProjectUUID, setDeleteProjectUUID] = useState<string | null>(null);

  useEffect(() => {
    if (tableRef.current) {
      new List(tableRef.current, {
        valueNames: ['no', 'name', 'property', 'address', 'contactNo', 'startDate'],
        listClass: 'list',
      });
    }
  }, [tableRef]);

  const onClickProjectName = (project: ProjectType) =>
    dispatch(push(`/projects/${project.uuid}`, project));

  const onClickDeleteProject = (e: React.MouseEvent<HTMLAnchorElement>, uuid: string) => {
    e.preventDefault();
    setDeleteProjectUUID(uuid);
    setModalDeleteVisible(true);
  };

  const onClickCancelDelete = () => {
    setDeleteProjectUUID(null);
    setModalDeleteVisible(false);
  };

  const onClickConfirmDelete = () => {
    if (deleteProjectUUID) {
      dispatch(deleteProject.trigger({ uuid: deleteProjectUUID }));
      setModalDeleteVisible(false);
    }
  };

  return (
    <>
      <div className="table-responsive" ref={tableRef}>
        <Table className="align-items-center table-flush" responsive>
          <thead className="thead-light">
            <tr>
              <th className="sort" data-sort="no" scope="col">
                no
              </th>
              <th className="sort" data-sort="name" scope="col">
                Name
              </th>
              <th className="sort" data-sort="property" scope="col">
                Property
              </th>
              <th className="sort" data-sort="address" scope="col">
                Address
              </th>
              <th className="sort" data-sort="contactNo" scope="col">
                Contact No
              </th>
              <th className="sort" data-sort="startDate" scope="col">
                Start Date
              </th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody className="list">
            {projects.map((project, index) => {
              return (
                <tr key={project.uuid}>
                  <td className="no">{index + 1}</td>
                  <ProjectNameWrapper className="name" onClick={() => onClickProjectName(project)}>
                    {project.name}
                  </ProjectNameWrapper>
                  <td className="property">{project.property}</td>
                  <td className="address">{project.address}</td>
                  <td className="contactNo">{project.contactNo}</td>
                  <td className="startDate">{project.startDate}</td>
                  <td>
                    <a
                      id={`tooltip-delete-${project.uuid}`}
                      className="table-action table-action-delete"
                      href=""
                      onClick={(e) => onClickDeleteProject(e, project.uuid)}
                    >
                      <i className="fas fa-trash" />
                    </a>
                    <UncontrolledTooltip delay={0} target={`tooltip-delete-${project.uuid}`}>
                      Delete
                    </UncontrolledTooltip>
                  </td>
                </tr>
              );
            })}
            {projects.length === 0 && (
              <tr>
                <td>No data found</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      <DeleteProjectModal
        visible={modalDeleteVisible}
        onClickCancel={onClickCancelDelete}
        onClickCofirm={onClickConfirmDelete}
      />
    </>
  );
};

export default memo(ProjectListTable);
