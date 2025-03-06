package esprit.gestionprojetpi.Services;

import com.itextpdf.text.*;
import com.itextpdf.text.Font;
import com.itextpdf.text.pdf.*;
import esprit.gestionprojetpi.Entities.Livrable;
import esprit.gestionprojetpi.Entities.Projet;
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

        // Prepare PDF output
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        // Document with smaller margins (left, right, top, bottom)
        Document document = new Document(PageSize.A4, 20, 20, 20, 20);

        // Create writer and set a page event to draw an orange border
        PdfWriter writer = PdfWriter.getInstance(document, out);
        writer.setPageEvent(new OrangeBorderEvent());  // Custom page event for orange border

        document.open();

        // 1) Add Website Logo
        String logoPath = "src/main/java/esprit/gestionprojetpi/images/crane.png"; // Update if needed
        Image logo = Image.getInstance(logoPath);
        logo.scaleToFit(80, 80); // Adjust as needed
        logo.setAlignment(Element.ALIGN_CENTER);
        document.add(logo);

        // 2) Title
        Font titleFont = new Font(Font.FontFamily.HELVETICA, 18, Font.BOLD, BaseColor.BLACK);
        Paragraph title = new Paragraph("Project Report", titleFont);
        title.setAlignment(Element.ALIGN_CENTER);
        document.add(title);

        // Add some space after the title
        document.add(Chunk.NEWLINE);

        // 3) Project Details Section
        Font headerFont = new Font(Font.FontFamily.HELVETICA, 14, Font.BOLD, BaseColor.BLACK);
        Font labelFont = new Font(Font.FontFamily.HELVETICA, 12, Font.BOLD, BaseColor.DARK_GRAY);
        Font textFont  = new Font(Font.FontFamily.HELVETICA, 12, Font.NORMAL, BaseColor.BLACK);

        Paragraph detailsHeading = new Paragraph("Project Details", headerFont);
        detailsHeading.setAlignment(Element.ALIGN_LEFT);
        document.add(detailsHeading);
        document.add(Chunk.NEWLINE);

        // Table for project details (2 columns)
        // Increase the first column width and/or add padding to shift labels further right
        PdfPTable detailsTable = new PdfPTable(2);
        detailsTable.setWidthPercentage(100);
        detailsTable.setWidths(new float[]{3.5f, 5f}); // Wider first column to shift labels
        detailsTable.setSpacingBefore(5f);
        detailsTable.setSpacingAfter(10f);

        // Header row for "Project Details" table
        addHeaderCell(detailsTable, "Label", textFont);
        addHeaderCell(detailsTable, "Value", textFont);

        // Populate rows
        addLabelValueRow(detailsTable, "Project Name:", projet.getNom(), labelFont, textFont);
        addLabelValueRow(detailsTable, "Description:", projet.getDescription(), labelFont, textFont);
        addLabelValueRow(detailsTable, "Status:", projet.getEtat().name(), labelFont, textFont);
        addLabelValueRow(detailsTable, "Budget:", projet.getBudget() + " USD", labelFont, textFont);
        addLabelValueRow(detailsTable, "Start Date:",
                projet.getDateDebut().format(DateTimeFormatter.ISO_DATE), labelFont, textFont);
        addLabelValueRow(detailsTable, "Expected End Date:",
                projet.getDateFinPrevue().format(DateTimeFormatter.ISO_DATE), labelFont, textFont);

        document.add(detailsTable);

        // 4) Deliverables Section
        Paragraph deliverablesHeading = new Paragraph("Deliverables", headerFont);
        deliverablesHeading.setAlignment(Element.ALIGN_LEFT);
        document.add(deliverablesHeading);
        document.add(Chunk.NEWLINE);

        List<Livrable> livrables = projet.getLivrables();
        if (!livrables.isEmpty()) {
            PdfPTable table = new PdfPTable(4);
            table.setWidthPercentage(100);
            table.setWidths(new float[]{2f, 2f, 2f, 2f});
            table.setSpacingBefore(5f);

            // Header row
            addHeaderCell(table, "Name", textFont);
            addHeaderCell(table, "Type", textFont);
            addHeaderCell(table, "Status", textFont);
            addHeaderCell(table, "Due Date", textFont);

            // Deliverables data
            for (Livrable livrable : livrables) {
                addBodyCell(table, livrable.getNom(), textFont);
                addBodyCell(table, livrable.getType(), textFont);
                addBodyCell(table, livrable.getStatut().name(), textFont);
                addBodyCell(table, livrable.getDateRemisePrevue().format(DateTimeFormatter.ISO_DATE), textFont);
            }
            document.add(table);
        } else {
            document.add(new Paragraph("No deliverables found.", textFont));
        }

        // Extra spacing before signatures
        document.add(Chunk.NEWLINE);
        document.add(Chunk.NEWLINE);

        // 5) Signature Section
        Paragraph signatureHeading = new Paragraph("Signatures", headerFont);
        signatureHeading.setAlignment(Element.ALIGN_LEFT);
        document.add(signatureHeading);
        document.add(Chunk.NEWLINE);

        // 2-column table with different widths so PM signature is more left
        PdfPTable signatureTable = new PdfPTable(2);
        signatureTable.setWidthPercentage(100);
        signatureTable.setSpacingBefore(10f);
        signatureTable.setWidths(new float[]{3f, 2f}); // Adjust ratio as needed

        PdfPCell teamSignatureCell = new PdfPCell(
                new Phrase("Team Signature:\n\n\n\n________________________", textFont));
        teamSignatureCell.setBorder(Rectangle.NO_BORDER);

        PdfPCell pmSignatureCell = new PdfPCell(
                new Phrase("Project Manager Signature:\n\n\n\n________________________", textFont));
        pmSignatureCell.setBorder(Rectangle.NO_BORDER);

        signatureTable.addCell(teamSignatureCell);
        signatureTable.addCell(pmSignatureCell);

        document.add(signatureTable);

        document.close();
        return out.toByteArray();
    }

    // ===========================
    //     HELPER METHODS
    // ===========================

    /**
     * Adds a styled header cell (light gray background) to the given table.
     */
    private void addHeaderCell(PdfPTable table, String text, Font font) {
        PdfPCell cell = new PdfPCell(new Phrase(text, font));
        cell.setBackgroundColor(new BaseColor(230, 230, 230)); // Light gray
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        cell.setPadding(5f);
        table.addCell(cell);
    }

    /**
     * Adds a two-column row: label on the left, value on the right.
     */
    private void addLabelValueRow(PdfPTable table, String label, String value,
                                  Font labelFont, Font valueFont) {
        // Label cell (slightly lighter background)
        PdfPCell labelCell = new PdfPCell(new Phrase(label, labelFont));
        labelCell.setBackgroundColor(new BaseColor(245, 245, 245));
        labelCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
        labelCell.setPadding(5f);
        labelCell.setPaddingRight(20f); // Extra right padding to push text further right

        // Value cell
        PdfPCell valueCell = new PdfPCell(new Phrase(value, valueFont));
        valueCell.setHorizontalAlignment(Element.ALIGN_LEFT);
        valueCell.setPadding(5f);

        table.addCell(labelCell);
        table.addCell(valueCell);
    }

    /**
     * Adds a normal data cell (white background) to the given table.
     */
    private void addBodyCell(PdfPTable table, String text, Font font) {
        PdfPCell cell = new PdfPCell(new Phrase(text, font));
        cell.setBackgroundColor(BaseColor.WHITE);
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        cell.setPadding(5f);
        table.addCell(cell);
    }

    /**
     * Page event to draw an orange border closer to the page edges.
     */
    private static class OrangeBorderEvent extends PdfPageEventHelper {
        @Override
        public void onEndPage(PdfWriter writer, Document document) {
            PdfContentByte cb = writer.getDirectContent();
            cb.setLineWidth(2f);
            cb.setColorStroke(new BaseColor(255, 165, 0)); // Orange color

            float pageWidth = document.getPageSize().getWidth();
            float pageHeight = document.getPageSize().getHeight();

            // We'll inset the border 10 points from each edge.
            float inset = 10f;
            float left = inset;
            float right = pageWidth - inset;
            float bottom = inset;
            float top = pageHeight - inset;

            cb.rectangle(left, bottom, right - left, top - bottom);
            cb.stroke();
        }
    }
}
