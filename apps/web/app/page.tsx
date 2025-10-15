import ProjectList from "@/components/tasktableview/ProjectList";
import TaskBoard from "@/components/kanbanview/TaskBoard";
import Header from "@/components/layout/Header";


export default function Page() {
    return (

            <div className="flex-1">
                <Header />
                <TaskBoard />
                <div id="project-list" className="mt-12">
                    <ProjectList />
                </div>
            </div>

    );
}