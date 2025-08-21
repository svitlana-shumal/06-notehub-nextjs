// "use client";

// import Loader from "@/app/loading";
// import css from "./NoteDetailsClient.module.css";
// import fetchNoteById from "@/lib/api";
// import { HydrationBoundary } from "@tanstack/react-query";
// import { DehydratedState, useQuery } from "@tanstack/react-query";

// interface NoteDetailsClientProps {
//   noteId: string;
//   dehydratedState: DehydratedState;
// }

// export default function NoteDetailsClient({
//   noteId,
//   dehydratedState,
// }: NoteDetailsClientProps) {
//   return (
//     <HydrationBoundary state={dehydratedState}>
//       <NoteContent noteId={noteId} />
//     </HydrationBoundary>
//   );
// }

// function NoteContent({ noteId }: { noteId: string }) {
//   const {
//     data: note,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["note", noteId],
//     queryFn: () => fetchNoteById(noteId),
//     refetchOnMount: false,
//   });
//   if (isLoading) {
//     return <Loader />;
//   }
//   if (error || !note) {
//     return <p>Something went wrong.</p>;
//   }

//   return (
//     <div className={css.container}>
//       <div className={css.item}>
//         <div className={css.header}>
//           <h2>{note.title}</h2>
//         </div>
//         <p className={css.content}>{note.content}</p>
//         <p className={css.date}>Created date</p>
//         {new Date(note.createdAt).toLocaleDateString()}
//       </div>
//     </div>
//   );
// }

"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import fetchNoteById from "@/lib/api";
import css from "./NoteDetailsClient.module.css";

const NoteDetailsClient = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;

  if (error || !note) return <p>Something went wrong.</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>Created date</p>
        {new Date(note.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
};

export default NoteDetailsClient;
