import pandas as pd
import numpy as np
import time
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.neighbors import KNeighborsRegressor
from sklearn.svm import SVC
from sklearn.tree import DecisionTreeRegressor
from sklearn.tree import plot_tree, export_graphviz
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score, classification_report, accuracy_score, confusion_matrix, ConfusionMatrixDisplay
from sklearn.decomposition import PCA
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
import joblib

# 1. Chargement des données
df = pd.read_csv("dataset_construction_ml.csv")

# 2. Exploration
print(df.info())
print(df.describe())
print("Valeurs manquantes :\n", df.isnull().sum())
print("Unique type_projet:", df['type_projet'].unique())
print("Unique conditions_meteo:", df['conditions_meteo'].unique())

# 3. Nettoyage
df = df.dropna()

# 4. Encodage
label_enc_type = LabelEncoder()
df['type_projet'] = label_enc_type.fit_transform(df['type_projet'])
label_enc_meteo = LabelEncoder()
df['conditions_meteo'] = label_enc_meteo.fit_transform(df['conditions_meteo'])

# Save LabelEncoder mappings
type_projet_mapping = dict(zip(label_enc_type.classes_, label_enc_type.transform(label_enc_type.classes_)))
conditions_meteo_mapping = dict(zip(label_enc_meteo.classes_, label_enc_meteo.transform(label_enc_meteo.classes_)))
joblib.dump(type_projet_mapping, 'type_projet_mapping.joblib')
joblib.dump(conditions_meteo_mapping, 'conditions_meteo_mapping.joblib')
print("Type projet mapping:", type_projet_mapping)
print("Conditions meteo mapping:", conditions_meteo_mapping)

# 5. Variables explicatives / cible
X = df[['type_projet', 'budget_estime', 'duree_estimee', 'incident_qualite',
        'incident_securite', 'materiaux_defectueux', 'conditions_meteo']]
y = df['budget_reel']
y_class = (df['retard'] > 0).astype(int)

# 6. Normalisation
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)
joblib.dump(scaler, 'scaler.joblib')

# 7. Train/Test split
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)
X_train_class, X_test_class, y_train_class, y_test_class = train_test_split(X_scaled, y_class, test_size=0.2, random_state=42)

# 8. KNN Regressor
knn = KNeighborsRegressor(n_neighbors=5)
start = time.time()
knn.fit(X_train, y_train)
y_pred_knn = knn.predict(X_test)
knn_time = time.time() - start

print("\n--- KNN Regressor ---")
print("MAE:", mean_absolute_error(y_test, y_pred_knn))
print("MSE:", mean_squared_error(y_test, y_pred_knn))
print("R2:", r2_score(y_test, y_pred_knn))
knn_scores = cross_val_score(knn, X_scaled, y, cv=5, scoring='neg_mean_absolute_error')
print("KNN Cross-Validation MAE:", -knn_scores.mean())
print(f"Temps d'exécution KNN : {knn_time:.4f} secondes")

# 9. SVM Classifier
svm = SVC(kernel='linear')
start = time.time()
svm.fit(X_train_class, y_train_class)
y_pred_svm = svm.predict(X_test_class)
svm_time = time.time() - start

print("\n--- SVM Classification ---")
print("SVM Classification Report:\n", classification_report(y_test_class, y_pred_svm))
print("Accuracy:", accuracy_score(y_test_class, y_pred_svm))

# 10. Decision Tree Regressor
tree = DecisionTreeRegressor(max_depth=5)
start = time.time()
tree.fit(X_train, y_train)
y_pred_tree = tree.predict(X_test)
tree_time = time.time() - start

print("\n--- Decision Tree Regressor ---")
print("MAE:", mean_absolute_error(y_test, y_pred_tree))
print("MSE:", mean_squared_error(y_test, y_pred_tree))
print("R2:", r2_score(y_test, y_pred_tree))
tree_scores = cross_val_score(tree, X_scaled, y, cv=5, scoring='neg_mean_absolute_error')
print("Decision Tree Cross-Validation MAE:", -tree_scores.mean())
print(f"Temps d'exécution Decision Tree : {tree_time:.4f} secondes")

# Export Decision Tree as PNG
plt.figure(figsize=(25, 15))
plot_tree(tree, feature_names=X.columns, filled=True, rounded=True, fontsize=10)
plt.title("Decision Tree for Budget Prediction")
plt.savefig('decision_tree.png', dpi=300, bbox_inches='tight')
plt.close()

# Export Decision Tree as DOT file
export_graphviz(tree, out_file='decision_tree.dot',
                feature_names=X.columns, filled=True, rounded=True,
                special_characters=True)
# Label encode categorical features
le_type_projet = LabelEncoder()
le_conditions_meteo = LabelEncoder()


joblib.dump(tree, '/model.pkl')
joblib.dump(le_type_projet, '/le_type_projet.pkl')
joblib.dump(le_conditions_meteo, '/le_conditions_meteo.pkl')
# Convert DOT to SVG (requires Graphviz)

try:
    import graphviz
    with open('decision_tree.dot') as f:
        dot_graph = f.read()
    graphviz.Source(dot_graph).render('decision_tree', format='svg', cleanup=True)
except ImportError:
    print("Graphviz not installed. Install it to generate SVG: `pip install graphviz` and install Graphviz system package.")

# Save the model
joblib.dump(tree, 'decision_tree_model.joblib')

# 11. Visualisation des prédictions
plt.figure(figsize=(12, 6))
plt.subplot(1, 2, 1)
plt.scatter(y_test, y_pred_knn)
plt.title('KNN - Prédictions vs Réel')
plt.xlabel('Valeur réelle')
plt.ylabel('Prédictions')

plt.subplot(1, 2, 2)
plt.scatter(y_test, y_pred_tree)
plt.title('Decision Tree - Prédictions vs Réel')
plt.xlabel('Valeur réelle')
plt.ylabel('Prédictions')
plt.tight_layout()
plt.savefig('predictions_plot.png')
plt.close()

# 12. Matrice de confusion pour SVM
cm = confusion_matrix(y_test_class, y_pred_svm)
disp = ConfusionMatrixDisplay(confusion_matrix=cm, display_labels=['Pas de retard', 'Retard'])
disp.plot(cmap=plt.cm.Blues)
plt.title("Matrice de Confusion - SVM Classification")
plt.savefig('svm_confusion_matrix.png')
plt.close()
print(f"Temps d'exécution SVM : {svm_time:.4f} secondes")

# 13. PCA pour visualisation
pca = PCA(n_components=2)
X_pca = pca.fit_transform(X_scaled)
X_train_pca, X_test_pca, _, _ = train_test_split(X_pca, y_class, test_size=0.2, random_state=42)

svm_pca = SVC(kernel='linear')
svm_pca.fit(X_train_pca, y_train_class)
y_pred_pca = svm_pca.predict(X_test_pca)

plt.figure(figsize=(8, 6))
sns.scatterplot(x=X_test_pca[:, 0], y=X_test_pca[:, 1], hue=y_pred_pca, palette="coolwarm", alpha=0.8)
plt.title("SVM Classification - Projection PCA")
plt.xlabel("PCA Composante 1")
plt.ylabel("PCA Composante 2")
plt.legend(title="Prédiction SVM")
plt.savefig('svm_pca_plot.png')
plt.close()

# 14. Clustering K-Means
kmeans = KMeans(n_clusters=3, random_state=42)
clusters = kmeans.fit_predict(X_scaled)
df['cluster'] = clusters
silhouette = silhouette_score(X_scaled, clusters)
print(f"\nScore de silhouette (KMeans) : {silhouette:.3f}")

# Visualisation des clusters
plt.figure(figsize=(8, 6))
sns.scatterplot(x=X_pca[:, 0], y=X_pca[:, 1], hue=clusters, palette='Set2')
plt.title("Segmentation des projets avec K-Means (PCA)")
plt.xlabel("PCA Composante 1")
plt.ylabel("PCA Composante 2")
plt.legend(title="Cluster")
plt.savefig('kmeans_clusters_plot.png')
plt.close()

# 15. Recommandation améliorée basée sur la comparaison du budget estimé et réel
nouveau_projet = X_scaled[-1].reshape(1, -1)
cluster_projet = kmeans.predict(nouveau_projet)[0]
budget_estime = df['budget_estime'].iloc[-1]
budget_reel = df['budget_reel'].iloc[-1]
ecart_budgetaire = budget_reel - budget_estime

print(f"\nLe dernier projet appartient au cluster : {cluster_projet}")
print(f"Budget estimé : {budget_estime}, Budget réel : {budget_reel}, Écart budgétaire : {ecart_budgetaire}")

if cluster_projet == 0:
    print("- Risque faible pour la sécurité et les incidents. Continuer avec le plan initial.")
elif cluster_projet == 1:
    print("- Attention aux incidents de sécurité. Recommander une surveillance accrue.")
else:
    print("- Problèmes budgétaires potentiels. Recommander une révision du budget estimé et une analyse approfondie.")