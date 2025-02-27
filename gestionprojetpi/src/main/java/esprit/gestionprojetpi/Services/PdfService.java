package esprit.gestionprojetpi.Services;

import com.itextpdf.text.*;
import com.itextpdf.text.Font;
import com.itextpdf.text.pdf.*;
import esprit.gestionprojetpi.Entities.Projet;
import esprit.gestionprojetpi.Entities.Livrable;
import esprit.gestionprojetpi.Repositories.ProjetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.time.format.DateTimeFormatter;
import java.util.List;



@Service
public class PdfService {

    @Autowired
    private ProjetRepository projetRepository;

    public byte[] generateProjectPdf(Long projectId) throws Exception {
        Projet projet = projetRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        Document document = new Document();

        PdfWriter.getInstance(document, out);
        document.open();

        Font titleFont = new Font(Font.FontFamily.HELVETICA, 18, Font.BOLD);
        Font headerFont = new Font(Font.FontFamily.HELVETICA, 14, Font.BOLD);
        Font textFont = new Font(Font.FontFamily.HELVETICA, 12);

        // Title
        Paragraph title = new Paragraph("Project Report", titleFont);
        title.setAlignment(Element.ALIGN_CENTER);
        document.add(title);

        document.add(new Paragraph("\nProject Details:\n", headerFont));
        document.add(new Paragraph("Project Name: " + projet.getNom(), textFont));
        document.add(new Paragraph("Description: " + projet.getDescription(), textFont));
        document.add(new Paragraph("Status: " + projet.getEtat().name(), textFont));
        document.add(new Paragraph("Budget: " + projet.getBudget() + " USD", textFont));
        document.add(new Paragraph("Start Date: " + projet.getDateDebut().format(DateTimeFormatter.ISO_DATE), textFont));
        document.add(new Paragraph("Expected End Date: " + projet.getDateFinPrevue().format(DateTimeFormatter.ISO_DATE), textFont));

        // Deliverables Table
        document.add(new Paragraph("\nDeliverables:\n", headerFont));

        List<Livrable> livrables = projet.getLivrables();

        if (!livrables.isEmpty()) {
            PdfPTable table = new PdfPTable(4);
            table.setWidthPercentage(100);
            table.setSpacingBefore(10f);

            addTableHeader(table, "Name");
            addTableHeader(table, "Type");
            addTableHeader(table, "Status");
            addTableHeader(table, "Due Date");

            for (Livrable livrable : livrables) {
                table.addCell(new PdfPCell(new Phrase(livrable.getNom(), textFont)));
                table.addCell(new PdfPCell(new Phrase(livrable.getType(), textFont)));
                table.addCell(new PdfPCell(new Phrase(livrable.getStatut().name(), textFont)));
                table.addCell(new PdfPCell(new Phrase(livrable.getDateRemisePrevue().format(DateTimeFormatter.ISO_DATE), textFont)));
            }
            document.add(table);
        } else {
            document.add(new Paragraph("No deliverables found.", textFont));
        }

        document.close();
        return out.toByteArray();
    }

    private void addTableHeader(PdfPTable table, String columnTitle) {
        PdfPCell header = new PdfPCell();
        Font font = new Font(Font.FontFamily.HELVETICA, 12, Font.BOLD);
        header.setPhrase(new Phrase(columnTitle, font));
        header.setHorizontalAlignment(Element.ALIGN_CENTER);
        header.setBackgroundColor(BaseColor.LIGHT_GRAY);
        table.addCell(header);
    }
}
