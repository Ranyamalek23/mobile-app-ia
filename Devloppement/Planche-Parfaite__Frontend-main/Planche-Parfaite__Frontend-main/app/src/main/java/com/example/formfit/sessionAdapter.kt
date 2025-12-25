import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.formfit.R
import com.example.formfit.model.Session
import java.text.SimpleDateFormat
import java.util.Locale
import java.util.*

class SessionAdapter(private val sessions: List<Session>) : RecyclerView.Adapter<SessionAdapter.SessionViewHolder>() {

    class SessionViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val sessionDate: TextView = itemView.findViewById(R.id.sessionDate)
        val sessionDuration: TextView = itemView.findViewById(R.id.sessionDuration)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): SessionViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_session, parent, false)
        return SessionViewHolder(view)
    }

    override fun onBindViewHolder(holder: SessionViewHolder, position: Int) {
        val session = sessions[position]
        holder.sessionDate.text = formatDate(session.startTime)
        holder.sessionDuration.text = session.duration.toString() + "  s   ⏲\uFE0F"
    }

    override fun getItemCount(): Int {
        return sessions.size
    }

    private fun formatDate(dateString: String): String {
        return try {
            val inputFormat = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.US)
            inputFormat.timeZone = TimeZone.getTimeZone("UTC") // Ensure parsing from UTC

            val outputFormat = SimpleDateFormat("dd MMMM yyyy", Locale.FRENCH)
            val date = inputFormat.parse(dateString)

            date?.let { outputFormat.format(it) } ?: dateString
        } catch (e: Exception) {
            dateString // Return original if parsing fails
        }
    }
}