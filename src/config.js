const SERVER = 'http://localhost:5052/api';


const DATAGRID_RESULTS_PER_PAGE = 20;
// TODO: compute client screen width
const DATAGRID_WIDTH = document.querySelector('.MuiDataGrid-viewport')?.clientWidth || 900;


export { SERVER, DATAGRID_RESULTS_PER_PAGE, DATAGRID_WIDTH }