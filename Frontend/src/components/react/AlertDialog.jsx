import React from "react"

const AlertDialog = ([]) => {

return (
<AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Registro Exitoso</AlertDialogTitle>
      <AlertDialogDescription>
        Los datos han sido registrados correctamente.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogAction onClick={() => setIsModalOpen(false)}>Aceptar</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
) 
}

export default AlertDialog;

