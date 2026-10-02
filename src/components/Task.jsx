function TaskCard({ id, status, desc }) {
    return (
        <li>
            <input type='checkbox' />
            <p>{desc}</p>
        </li>
    );
}
export default TaskCard;
